import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config();

const config = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
const url = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

const client = postgres(url);

const db = drizzle(client);

await migrate(db, { migrationsFolder: "drizzle" });

export { db };
