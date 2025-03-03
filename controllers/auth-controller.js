import { verify } from "crypto";
import UserSchema from "../schema/userschema.js";
import { signInJwt } from "../utils/jwt.js";
import { ResData } from "../utils/response-data.js";

export const signUp = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await UserSchema.create({ ...body });
    const token = signInJwt({ id: data._id });
    const resData = new ResData(201, "succsess", { user: data, token });
    res.status(resData.status).json(resData);
  } catch (error) {
    next(error);
  }
};
