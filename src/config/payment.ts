import axios from "axios";
export const paypalToken = async () => {
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
  
  return access_token;
}