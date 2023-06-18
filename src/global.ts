import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import MovieDB from "node-themoviedb/index.js";
declare global {
  var db: PostgresJsDatabase;
  var tmdb: MovieDB;
}
