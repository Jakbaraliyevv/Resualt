// // import movieSchemas from "../schema/movieschema.js";

// // // Barcha filmlarni olish
// // const getData = async (req, res, next) => {
// //   try {
// //     const movies = await movieSchemas.find();
// //     res.status(200).json(movies);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Bitta filmni ID orqali olish
// // const getSingleData = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const movie = await movieSchemas.findById(id);
// //     if (!movie) return res.status(404).json({ message: "Movie not found" });
// //     res.status(200).json(movie);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Yangi film qo'shish
// // const createData = async (req, res, next) => {
// //   try {
// //     const newMovie = new movieSchemas(req.body);
// //     await newMovie.save();
// //     res.status(201).json(newMovie);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Filmni yangilash
// // const updateData = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const updatedMovie = await movieSchemas.findByIdAndUpdate(id, req.body, {
// //       new: true,
// //     });
// //     if (!updatedMovie)
// //       return res.status(404).json({ message: "Movie not found" });
// //     res.status(200).json(updatedMovie);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Filmni o‘chirish
// // const deleteData = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const deletedMovie = await movieSchemas.findByIdAndDelete(id);
// //     if (!deletedMovie)
// //       return res.status(404).json({ message: "Movie not found" });
// //     res.status(200).json({ message: "Movie deleted successfully" });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export { getData, getSingleData, createData, updateData, deleteData };

// import Movie from "../schema/movieschema.js";
// import { movieValidationSchema } from "../validator/uservalidator.js";

// // **1. Barcha filmlarni olish**
// export const getMovies = async (req, res, next) => {
//   try {
//     const movies = await Movie.find();
//     res.status(200).json(movies);
//   } catch (error) {
//     next(error);
//   }
// };

// // **2. Bitta filmni ID orqali olish**
// export const getMovieById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const movie = await Movie.findById(id);
//     if (!movie) return res.status(404).json({ message: "Movie not found" });
//     res.status(200).json(movie);
//   } catch (error) {
//     next(error);
//   }
// };

// // **3. Yangi film qo'shish**
// export const createMovie = async (req, res, next) => {
//   try {
//     const { error } = movieValidationSchema.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const newMovie = new Movie(req.body);
//     await newMovie.save();
//     res.status(201).json(newMovie);
//   } catch (error) {
//     next(error);
//   }
// };

// // **4. Filmni yangilash**
// export const updateMovie = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!updatedMovie)
//       return res.status(404).json({ message: "Movie not found" });

//     res.status(200).json(updatedMovie);
//   } catch (error) {
//     next(error);
//   }
// };

// // **5. Filmni o‘chirish**
// export const deleteMovie = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deletedMovie = await Movie.findByIdAndDelete(id);

//     if (!deletedMovie)
//       return res.status(404).json({ message: "Movie not found" });

//     res.status(200).json({ message: "Movie deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

import { CustomError } from "../errors/index.js";
import Movie from "../schema/movieschema.js";
import { ResData } from "../utils/response-data.js";
import {
  movieValidationSchema,
  ticketValidationSchema,
} from "../validator/uservalidator.js";

// **1. Barcha filmlarni olish**
export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res
      .status(200)
      .json(new ResData(200, "Movies fetched successfully", movies));
  } catch (error) {
    next(new CustomError(500, "Failed to fetch movies"));
  }
};

// **2. Bitta filmni ID orqali olish**
export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) throw new CustomError(404, "Movie not found");

    res.status(200).json(new ResData(200, "Movie fetched successfully", movie));
  } catch (error) {
    next(
      error instanceof CustomError
        ? error
        : new CustomError(500, "Failed to fetch movie")
    );
  }
};

// **3. Yangi film qo'shish**
export const createMovie = async (req, res, next) => {
  try {
    const { error } = movieValidationSchema.validate(req.body);
    if (error) throw new CustomError(400, error.details[0].message);

    const newMovie = new Movie(req.body);
    await newMovie.save();
    res
      .status(201)
      .json(new ResData(201, "Movie created successfully", newMovie));
  } catch (error) {
    next(
      error instanceof CustomError
        ? error
        : new CustomError(500, "Failed to create movie")
    );
  }
};

// **4. Filmni yangilash**
export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) throw new CustomError(404, "Movie not found");

    res
      .status(200)
      .json(new ResData(200, "Movie updated successfully", updatedMovie));
  } catch (error) {
    next(
      error instanceof CustomError
        ? error
        : new CustomError(500, "Failed to update movie")
    );
  }
};

// **5. Filmni o‘chirish**
export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) throw new CustomError(404, "Movie not found");

    res.status(200).json(new ResData(200, "Movie deleted successfully"));
  } catch (error) {
    next(
      error instanceof CustomError
        ? error
        : new CustomError(500, "Failed to delete movie")
    );
  }
};

export const buyTicket = async (req, res, next) => {
  try {
    const { error } = ticketValidationSchema.validate(req.body);
    if (error) throw new CustomError(400, error.details[0].message);

    const { movieId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) throw new CustomError(404, "Movie not found");
    if (movie.availableTickets <= 0)
      throw new CustomError(400, "All tickets are sold out");

    movie.availableTickets -= 1;
    await movie.save();

    res.status(200).json(
      new ResData(200, "Ticket purchased successfully", {
        availableTickets: movie.availableTickets,
      })
    );
  } catch (error) {
    next(
      error instanceof CustomError
        ? error
        : new CustomError(500, "Failed to purchase ticket")
    );
  }
};
