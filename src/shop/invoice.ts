import { accesToken } from "../token/paypalToken.js";
import { invoiceNumber } from "./invoiceNumber.js";
export async function createInvoice( invoiceId: string ) {
  const token = await accesToken();
  const invoice = await invoiceNumber();
  const url = `https://api-m.sandbox.paypal.com/v2/invoicing/invoices`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      "merchant_info": {
        "email": "myticket@gmail.com",
        "business_name": "Myticket",
        "address": {
          "line1": "1234 Main Street",
          "city": "San Jose",
          "state": "CA",
          "postal_code": "95131",
          "country_code": "US"
        }
      },
      "billing_info": [
        {
          "email": "customer1@example.com"
        }
      ],
      "items": [
        {
          "name": "Product 1",
          "quantity": 1,
          "unit_price": {
            "currency": "USD",
            "value": "10.00"
          }
        },
        {
          "name": "Product 2",
          "quantity": 2,
          "unit_price": {
            "currency": "USD",
            "value": "5.00"
          }
        }
      ]
    }
    ),
});
const data = await response.json();
return data;
}