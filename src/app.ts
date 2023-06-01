import express from "express";
import authController from "./controllers/authController.js";
import reserveController from "./controllers/reserveController.js";
import paymentController from "./controllers/paymentControllert.js";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authController);
app.use(reserveController);
app.use(paymentController);

//Exports

export default app;
