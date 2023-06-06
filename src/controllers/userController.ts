import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import token from "jsonwebtoken";
import { booking } from "../models/Reserve.js";

const userController = Router();

userController.use(authMiddleware);

userController.get("/profile", (req, res, next) => {
  res.send({
    message: "You made it to the secure route",
  })
});



export default userController;