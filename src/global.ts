import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
declare global {
  var db: PostgresJsDatabase;
}
