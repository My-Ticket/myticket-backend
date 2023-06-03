import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { paypalToken } from "../config/payment.js";
dotenv.config();
const paymentController = Router();

paymentController.get('/create-order', async (req, res, next) => {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "3.20",
        }
      },
    ],
    application_context: {
      brand_name: "MyTicket",
      landing_page: 'NO_PREFERENCE',
      user_action: "PAY_NOW",
      return_url: `${process.env.LOCAL_HOST}capture-order`,
      cancel_url: `${process.env.LOCAL_HOST}cancel-order`,
    }
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(
    `${process.env.PAYPAL_HOST}v1/oauth2/token`,
    params,
    {
      auth: {
        username: `${process.env.PAYPAL_API_SECRET}`,
        password: `${process.env.PAYPAL_API_CLIENT}`,
      },
    }
  );

  const response = await axios.post(`${process.env.PAYPAL_HOST}v2/checkout/orders`, order, {
    headers: {
        Authorization: `Bearer ${access_token}`
    }
  })


  return res.json(response.data);

})

paymentController.get('/capture-order', async (req, res, next) => {
  const { token } = req.query;
  const response = await axios.post(`${process.env.PAYPAL_HOST}v2/checkout/orders/${token}/capture`, {}, {
    auth: {
      username: `${process.env.PAYPAL_API_SECRET}`,
      password: `${process.env.PAYPAL_API_CLIENT}`,
    },
  });
  const data = response.data;

  console.log(data);

  const invoice = {
    merchant_info: {
      email: 'Myticket@gmail.com',
      first_name: 'Kahyberth Stiven',
      last_name: 'Gonzalez Sayas'
    }, 
    billing_info: [
      {
        email: data.payer.email_address
      }
    ],
    items: [
      {
        name: 'Movie Ticket',
        quantity: 1,
        unit_price: {
          currency: 'USD',
          value: data.purchase_units[0].payments.captures[0].amount.value,
        }
      }
  ],
  note: 'thank for your purchase :D'
  }
  
  res.json(invoice);
})

paymentController.get('/cancel-order', (req, res, next) => {
  res.send('Cancelled Order');
})

paymentController.post('/refund-order', async (req, res, next) => {
  try {
    const { transactionId, amount } = req.body;
   const token = await paypalToken();
    const response = await axios.post(`${process.env.PAYPAL_HOST}v2/payments/captures/${transactionId}/refund`, 
    {
      amount: {
        value: amount,
        currency_code: 'USD',
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    );
    res.send('Successful reimbursement :)');
    console.log( response.data );
  } catch (error) {
    throw new Error('Refund error :(');
  }
})

export default paymentController;