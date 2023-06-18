import { Router } from "express";
import { getAllBillboards } from "../db/schema/billboard.js";

const billboardController = Router();

billboardController.get('/billboard', async ( req, res, next ) => {
  res.send(await getAllBillboards());
});



export default billboardController;