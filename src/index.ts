import dotenv from "dotenv";
dotenv.config();

import { db } from "./db/db.js";
import app from "./app.js";
global.db = db;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
