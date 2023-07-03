import { accesToken } from "../token/paypalToken.js";

export const invoiceNumber = async () => {
  const token = await accesToken();
  const url = `https://api-m.sandbox.paypal.com/v2/invoicing/generate-next-invoice-number`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}