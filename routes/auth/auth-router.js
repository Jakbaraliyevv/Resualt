import { Router } from "express";
import {
  signIn,
  signUp,
  verifyEmail,
} from "../../controllers/auth-controller.js";
import {
  validateUserLogin,
  validateUserSignup,
  verifyRegisterSchemas,
} from "../../middlewares/verify-meddlware.js";

const router1 = Router();
router1.post("/sign-up", validateUserSignup, signUp);
router1.post("/verify", verifyRegisterSchemas, verifyEmail);
router1.post("/sign-in", validateUserLogin, signIn);

export default router1;
