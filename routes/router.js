import { Router } from "express";
import router1 from "./auth/auth-router.js";
import router2 from "./movie/movie-router.js";
const router = Router();

router.use("/auth", router1);
router.use("/movie", router2);
export default router;
