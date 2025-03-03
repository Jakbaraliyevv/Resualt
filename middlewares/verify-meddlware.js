import { CustomError } from "../errors/index.js";
import {
  userValidatorSchema,
  verifyRegisterSchema,
} from "../validator/uservalidator.js";

const validateUserSignup = (req, res, next) => {
  try {
    const { error } = userValidatorSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyRegisterSchemas = (req, res, next) => {
  try {
    const { error } = verifyRegisterSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { validateUserSignup, verifyRegisterSchemas };
