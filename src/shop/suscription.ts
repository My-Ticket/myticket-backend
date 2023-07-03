import { accesToken } from "../token/paypalToken.js";

export async function subscription ( plan_id: string ) {
    const token = await accesToken();
    const url = `https://api-m.sandbox.paypal.com/v1/billing/subscriptions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan_id: plan_id,
        quantity: 1,
        subscriber: {
            name: {
                given_name: "Kahyberth",
                surname: "Gonzalez"
            },
            email_address: "customer@example.com",
        },
        return_url: 'http://localhost:5000/',
        cancel_url: 'http://localhost:5000/'
      })
    });

    const data = await response.json();
    return data;
}