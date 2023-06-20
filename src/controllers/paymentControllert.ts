import { Router } from "express";
import { createOrder } from "../shop/order.js";
import { createProduct } from "../shop/product.js";
import { plan } from "../shop/plan.js";
import { capturePayment } from "../shop/capture.js";
import { subscription } from "../shop/suscription.js";
const paymentController = Router();


paymentController.get('/create-order', async (req, res) => {
    const order = await createOrder();
    res.json(order);
  });

paymentController.get('/capture-order', async (req, res) => {
    const token = req.query.token;
    const capture = await capturePayment(`${token}`);
    res.json(capture);
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
  res.json(dato);
});

export default paymentController;