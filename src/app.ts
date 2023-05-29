import express from "express";
import authController from "./controllers/authController.js";
import reserveController from "./controllers/reserveController.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authController);
app.use(reserveController);

//Exports

export default app;
