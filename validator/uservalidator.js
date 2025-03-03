import Joi from "joi";

const userValidatorSchema = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .required(),
  password: Joi.string().min(6).required(),
});

const verifyRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().max(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const movieValidationSchema = Joi.object({
  title: Joi.string().required(),
  ageRestriction: Joi.number().integer().min(0).required(),
  image: Joi.string().uri().required(),
  targetAudience: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).min(1).required(),
  availableDate: Joi.string()
    .valid("Today", "Tomorrow", "Day after tomorrow")
    .required(),
  availableTime: Joi.string().pattern(/^\d{2}:\d{2}$/), // "14:30" format
  format: Joi.string().valid("2D", "3D", "4D").required(),
  price: Joi.number().min(0).required(),
  hallNumber: Joi.number().integer().min(1).required(),
  director: Joi.string().required(),
  duration: Joi.number().integer().min(1).required(),
  country: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1800)
    .max(new Date().getFullYear())
    .required(),
  description: Joi.string().required(),
});

export {
  userValidatorSchema,
  verifyRegisterSchema,
  userLoginSchema,
  movieValidationSchema,
};
