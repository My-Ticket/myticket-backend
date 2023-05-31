import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
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
  return res.json(data);
})

paymentController.get('/cancel-order', (req, res, next) => {
  res.send('Cancelled Order');
})

export default paymentController;