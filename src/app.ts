import express from "express";
import authController from "./controllers/authController.js";
import reserveController from "./controllers/reserveController.js";
import paymentController from "./controllers/paymentControllert.js";
import morgan from "morgan";
import userController from "./controllers/userController.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { reservationsHandler } from "./socket/reservation.js";
import billboardController from "./controllers/billboardController.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth" ,authController);
app.use("/content" ,billboardController);
app.use(reserveController);
app.use(paymentController);
app.use(userController);
//Exports

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
reservationsHandler(socketServer);
export default httpServer;
