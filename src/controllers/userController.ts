import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import token from "jsonwebtoken";
import { booking } from "../models/Reserve.js";

const userController = Router();

userController.use(authMiddleware);

userController.get("/profile", (req, res, next) => {
  const tokenheader = req.headers["x-access-token"] as string;
  if (!tokenheader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }

  try {
    token.verify(tokenheader, process.env.SECRET!);
    res.json("Dashboard");
    console.log("decoded");
  } catch (error) {}
});

//TODO: Es probable que sea mejor usar como parametro un ID unico para el usuario, primaryKey en la base de datos, cada usuario con un ID de reserva unico, para despues hacer comprobaciones.
userController.post("/reserve", async (req, res, next) => {
  const tokenheader = req.headers["x-access-token"] as string;
  const {title, date, seats} = req.body;
  if (!tokenheader) {
    return res.status(401).json({
      auth:false,
      message: "No valid token",
    })
  }
    try {
      const reserve = await booking( title, date, seats);
    } catch (error) {
      throw new Error('Reservation could not be made');
    }
});



export default userController;