import dotenv from "dotenv";
import { getDb } from "./db.js";
import app from "./app.js";
dotenv.config();
const db = await getDb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
