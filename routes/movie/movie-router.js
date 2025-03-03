import express from "express";
import {
  createData,
  deleteData,
  getData,
  getSingleData,
  updateData,
} from "../../controllers/movi-controller.js";

const router2 = express.Router();

router2.get("/movies", getData);
router2.get("/movies/:id", getSingleData);
router2.post("/movies", createData);
router2.put("/movies/:id", updateData);
router2.delete("/movies/:id", deleteData);

export default router2;
