import express from "express";
import {
  buyTicket,
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../../controllers/movi-controller.js";

const router2 = express.Router();

router2.get("/movies", getMovies);
router2.get("/movies/:id", getMovieById);
router2.post("/movies", createMovie);
router2.put("/movies/:id", updateMovie);
router2.delete("/movies/:id", deleteMovie);
router2.post("/movie/ticket/:id", buyTicket);
export default router2;
