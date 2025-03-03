import { Router } from "express";
import { signUp } from "../../controllers/auth-controller.js";
import { validateUserSignup } from "../../middlewares/verify-meddlware.js";

const router1 = Router();

router1.post("/sign-up", validateUserSignup, signUp);

export default router1;
