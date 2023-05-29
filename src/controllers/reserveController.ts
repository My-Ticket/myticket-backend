import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import token from "jsonwebtoken";
import { booking } from "../models/Reserve.js";

const reserveController = Router();


reserveController.post('/booking', async ( req, res, next ) => {
  const { id, title, tickets, seats } = req.body;
  const tokenheader = req.headers["x-access-token"] as string;
  if (!tokenheader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  try {
    const reserve = await booking( id, title, tickets, seats);
    res.send(reserve)
  } catch ( error ) {
    throw error;
  }
});

export default reserveController;