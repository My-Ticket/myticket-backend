import { Router } from "express";
import {getAllMovies, getMovieById, insertMovie, NewMovie, queryMovies, updateMovie} from "../db/schema/movies.js";
import { authMiddleware } from "../middleware/auth.js";
import {getTokenPayload} from "../util/getTokenPayload.js";

const moviesController = Router();

moviesController.get("/movies", async (req, res, next) => {
  res.send(await getAllMovies());
});

moviesController.get("/movies/billboard", async (req, res, next) => {
  res.send(await queryMovies({flags: "billboard"}));
});

moviesController.get("/movies/upcoming", async (req, res, next) => {
  res.send(await queryMovies({flags: "upcoming"}));
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

moviesController.post("/movies/add/:id", async function (req, res, next) {
  // @ts-ignore
  console.log(this)
  const { id } = req.params
  const duplicated = await getMovieById(parseInt(id))
  if (duplicated) {
    res.status(400).send({
      error: "The movie already exists"
    })
    return;
  }
  try {
    const movie = (await tmdb.movie.getDetails({
      pathParameters: {
        movie_id: id
      },
      query: {append_to_response: "videos"}
    })).data
   
    // @ts-ignore
    const trailer = (movie.videos.results.map((v) => {
      if (v.type === "Trailer" && v.site === "YouTube") {
        console.log(v)
        return v.key
      }
    })).join(" ").trim().split(" ")[0]
    const movieToInsert: NewMovie = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      backdropPath: movie.backdrop_path,
      rating: Math.floor(movie.vote_average),
      trailer: trailer,
      posterPath: movie.poster_path
    }
    await insertMovie(movieToInsert)
    res.send(movieToInsert);
    return;
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

moviesController.post("/movies/billboard/", async function (req, res) {
  const { ids } = req.body;
  console.log(req.body);
  await Promise.all(ids.map(async (id: number) => {
    const movie = await getMovieById(id)
    if (!movie) {
      res.status(400).send({
        error: "The movie does not exist"
      })
      return
    }

    updateMovie(id, {
      ...movie,
      flags: "billboard"
    })
  }))
  res.send({ message: "ok" });
})

moviesController.post("/movies/upcoming/", async function (req, res) {
  console.log(req.body);
  const { ids } = req.body;
  await Promise.all(ids.map(async (id: number) => {
    const movie = await getMovieById(id)
    if (!movie) {
      return
    }

    updateMovie(id, {
      ...movie,
      flags: "upcoming"
    })
  }
  ))
  res.send({ message: "ok" });
})

export default moviesController;
