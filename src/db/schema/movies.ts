import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  image: text("image"),
  rating: text("rating"),
  year: text("year"),
  trailer: text("trailer"),
})