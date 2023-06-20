import { accesToken } from "../token/paypalToken.js";

export const createProduct = async () => {
  const token = await accesToken();
  const url = `https://api-m.sandbox.paypal.com/v1/catalogs/products`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify({
      name: "Fidelity plan",
      description: "Myticket: la suscripción de cine que te brinda acceso exclusivo a estrenos, descuentos y beneficios especiales. Vive el séptimo arte al máximo",
      type: "SERVICE",
      category: "MOVIE_TICKETS",
      image_url: "https://imgur.com/a/sRuaEW6",
    }),
  });
  const data = await response.json();
  return data;
}