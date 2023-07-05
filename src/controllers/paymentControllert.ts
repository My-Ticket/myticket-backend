import { Router } from "express";
import { createOrder } from "../shop/order.js";
import { createProduct } from "../shop/product.js";
import { plan } from "../shop/plan.js";
import { capturePayment } from "../shop/capture.js";
import { subscription } from "../shop/suscription.js";
import { getTokenPayload } from "../util/getTokenPayload.js";
import { authMiddleware } from "../middleware/auth.js";
import { insertProduct } from "../db/schema/products.js";
import { insertPayment } from "../db/schema/payment.js";
const paymentController = Router();



paymentController.get('/create-order', async (req, res) => {
  const tk = getTokenPayload(req);
  if (typeof tk === 'string') {
    // El token no es válido
    console.log('Token inválido');
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  if (tk!) {
    console.log("Datos: ", tk);
    const { id } = tk;
    const order = await createOrder(id,3.00);
    res.json(order);
  } else {
    console.log("Token no válido");
    res.status(401).json({ error: "Invalid token" });
  }
});


paymentController.get('/capture-order', async (req, res) => {
    const tk = getTokenPayload(req);
    const token = req.query.token;
    const capture = await capturePayment(`${token}`);
    const { status, value } = capture;
    if (typeof tk === 'string') {
      // El token no es válido
      console.log('Token inválido');
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    if (tk!) {
      console.log("Datos: ", tk);
      console.log("DATOS DE LA CAPTURA: ", capture);
      const { id } = tk;
      const $payment = insertPayment({user_id:id,status,amount:capture.purchase_units[0].payments.captures[0].amount.value, pay_id: capture.id});
      res.send($payment);
    } else {
      console.log("Token no válido");
      res.status(401).json({ error: "Invalid token" });
    }
});

paymentController.post('/create-product', async (req, res) => {
    const dato = await createProduct();
    res.json(dato);
});

paymentController.post('/create-plan', async (req, res) => {
  const { product_id } = req.body;
  const dato = await plan( product_id );
  res.json(dato);
});

paymentController.post('/create-subscription', async (req, res) => {
  const { plan_id } = req.body;
  const dato = await subscription( plan_id );
  const { id, status, create_time } = dato;
  res.send(dato)
});

export default paymentController;
