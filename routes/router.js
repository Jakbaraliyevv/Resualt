import { Router } from "express";
import router1 from "./auth/auth-router.js";
const router = Router();

router.use("/auth", router1);
export default router;
