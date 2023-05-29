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



export default userController;