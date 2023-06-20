import { accesToken } from "../token/paypalToken.js";

export async function plan(product_id: string) {
  
  const token = await accesToken();
  const url = `https://api-m.sandbox.paypal.com/v1/billing/plans`;
  
  const plan = {
    name: 'PLAN mensual',
    product_id: product_id,
    status: "ACTIVE",
    billing_cycles: [
        {
            frequency: {
                interval_unit: "MONTH",
                interval_count: 1
            },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 12,
            pricing_scheme: {
                fixed_price: {
                    value: "3",
                    currency_code: "USD"
                }
            }
        }],
    payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
            value: "10",
            currency_code: "USD"
        },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3
    },
    taxes: {
        percentage: "10",
        inclusive: false
    }
}


const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(plan),
});
const data = await response.json();
return data;
}
