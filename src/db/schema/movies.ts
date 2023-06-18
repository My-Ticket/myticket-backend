import { InferModel, eq } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  rating: text("rating"),
  year: text("year"),
  trailer: text("trailer"),
  flags: text("flags"),
})

export type Movie = InferModel<typeof movies>
export type NewMovie = InferModel<typeof movies, "insert">

export async function insertMovie(movie: NewMovie): Promise<Movie> {
  const res = db.insert(movies).values(movie).returning();
  return (await res)[0];
}

export async function getMovieById(id: number): Promise<Movie> {
  const res = db.select().from(movies).where(eq(movies.id, id)).execute();
  return (await res)[0];
}

export async function updateMovie(id: number, movie: Movie): Promise<Movie> {
  const res = db.update(movies).set({title: movie.title}).where(eq(movies.id, id)).returning();
  return (await res)[0];
}

export async function getAllMovies(): Promise<Movie[]> {
  return await db.select().from(movies).execute();
}

type MovieQueryOpts = {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  rating?: string;
  year?: string;
  trailer?: string;
  flags?: string;
}

export async function queryMovies(queryOpts: MovieQueryOpts){
  const query = db.select().from(movies)
  if (queryOpts.id) query.where(eq(movies.id, queryOpts.id))
  if (queryOpts.title) query.where(eq(movies.title, queryOpts.title))
  if (queryOpts.description) query.where(eq(movies.description, queryOpts.description))
  if (queryOpts.image) query.where(eq(movies.image, queryOpts.image))
  if (queryOpts.rating) query.where(eq(movies.rating, queryOpts.rating))
  if (queryOpts.year) query.where(eq(movies.year, queryOpts.year))
  if (queryOpts.trailer) query.where(eq(movies.trailer, queryOpts.trailer))
  if (queryOpts.flags) query.where(eq(movies.flags, queryOpts.flags))
  return await query.execute();
}