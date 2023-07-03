import dotenv from "dotenv";
dotenv.config();

import { db } from "./db/db.js";
import app from "./app.js";
import MovieDB from "node-themoviedb";
global.db = db;
const mdb = new MovieDB(process.env.TMDB_API_KEY!);
mdb.setLanguage("es-MX");
global.tmdb = mdb;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});