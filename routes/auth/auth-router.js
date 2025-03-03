import { Router } from "express";
import { signUp, verifyEmail } from "../../controllers/auth-controller.js";
import {
  validateUserSignup,
  verifyRegisterSchemas,
} from "../../middlewares/verify-meddlware.js";

const router1 = Router();
router1.post("/sign-up", validateUserSignup, signUp);
router1.post("/verify", verifyRegisterSchemas, verifyEmail);

export default router1;
