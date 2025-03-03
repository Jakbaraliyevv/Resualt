import movieSchemas from "../schema/movieschema.js";

// Barcha filmlarni olish
const getData = async (req, res, next) => {
  try {
    const movies = await movieSchemas.find();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

// Bitta filmni ID orqali olish
const getSingleData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieSchemas.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

// Yangi film qo'shish
const createData = async (req, res, next) => {
  try {
    const newMovie = new movieSchemas(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

// Filmni yangilash
const updateData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMovie = await movieSchemas.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

// Filmni o‘chirish
const deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await movieSchemas.findByIdAndDelete(id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getData, getSingleData, createData, updateData, deleteData };
