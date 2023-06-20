import { accesToken } from "../token/paypalToken.js";

export const capturePayment = async ( orderId: string ) => {
  const token = await accesToken();
  const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;
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