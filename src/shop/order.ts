import { desc } from "drizzle-orm";
import { accesToken } from "../token/paypalToken.js";

export async function createOrder(userId: number, quantity: number) {
  const token = await accesToken();
  console.log('ID: '+typeof(userId));
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
          custom_id: userId,
          items: [
            {
              name: 'Ticket',
              quantity: (quantity).toString(),
              unit_amount: {
                currency_code: "USD",
                value: "4.00",
              }
            }
          ],
          description: "Ticket",
          amount: {
            currency_code: "USD",
            value: (quantity * 4).toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: (quantity * 4).toString(),
              }
            }
          }
        }
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

