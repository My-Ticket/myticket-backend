import { Router } from "express";
import { getAllMovies, insertMovie } from "../db/schema/movies.js";
import { authMiddleware } from "../middleware/auth.js";

const moviesController = Router();

moviesController.get("/movies", async (req, res, next) => {
  res.send(await getAllMovies());
});

moviesController.get("/movies/search/:query", async (req, res, next) => {
  const { query } = req.params;
  console.log(query);
  if (query === "__null__") {

    const response = (await tmdb.discover.movie({})).data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        image: movie.poster_path,
      };
    });
    res.send(response);
  } else {
    const response = (await tmdb.search.movies({query: {
        query: query,
      }})).data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        image: movie.poster_path,
      };
    });

    res.send(response);
  }
});

moviesController.use(authMiddleware);

moviesController.post("/movies", async (req, res, next) => {
  const { title, description, image } = req.body;
  try {
    const movie = await insertMovie({ title, description, image });
    res.send(movie);
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

export default moviesController;
