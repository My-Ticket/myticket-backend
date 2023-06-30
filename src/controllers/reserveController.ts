import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import token from "jsonwebtoken";
import { booking } from "../models/Reserve.js";

const reserveController = Router();

reserveController.use(authMiddleware);

reserveController.post('/booking', async ( req, res, next ) => {
  const { id, title, tickets, seats } = req.body;
  try {
    const reserve = await booking( id, title, tickets, seats);
    res.send(reserve)
  } catch ( error ) {
    // TODO: Handle error, and inform the client
    throw error;
  }
});

export default reserveController;