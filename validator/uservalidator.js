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

export { userValidatorSchema };
