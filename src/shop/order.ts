import { accesToken } from "../token/paypalToken.js";

export async function createOrder() {
  const token = await accesToken();
  const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
            {
            amount: {
                currency_code: "USD",
                value: "4.00",
            },
        },
    ],
    application_context: {
      brand_name: "MyTicket",
      landing_page: 'NO_PREFERENCE',
      user_action: "PAY_NOW",
      return_url: `http://localhost:5000/create-order`,
      cancel_url: `http://localhost:5000/cancel-order`,
    }
    }),
});
const data = await response.json();
return data;
}