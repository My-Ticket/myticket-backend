import { InferModel, eq } from "drizzle-orm";
import { pgTable, serial, text, integer, pgEnum,  } from "drizzle-orm/pg-core";


export const movieStatesEnum = pgEnum("movie_states", ["billboard", "upcoming"])
export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  overview: text("overview"),
  posterPath: text("poster_path"),
  backdropPath: text("backdrop_path"),
  rating: integer("rating").default(0),
  trailer: text("trailer"),
  flags: movieStatesEnum("movie_states")
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
  const res = db.update(movies).set(movie).where(eq(movies.id, id)).returning();
  return (await res)[0];
}

export async function getAllMovies(): Promise<Movie[]> {
  return await db.select().from(movies).execute();
}

type MovieQueryOpts = {
  id?: number;
  title?: string;
  flags?: "billboard" | "upcoming";
}

export async function queryMovies(queryOpts: MovieQueryOpts){
  let query = db.select().from(movies)
  if (queryOpts.id) query = query.where(eq(movies.id, queryOpts.id))
  if (queryOpts.title) query =query.where(eq(movies.title, queryOpts.title))
  if (queryOpts.flags) query = query.where(eq(movies.flags, queryOpts.flags))
  return await query.execute();
}