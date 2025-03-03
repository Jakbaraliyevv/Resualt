import { Router } from "express";
import { signUp } from "../../controllers/auth-controller.js";

const router1 = Router();

router1.post("/sign-up", signUp);

export default router1;
