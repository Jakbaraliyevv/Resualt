import UserSchema from "../schema/userschema.js";

export const signUp = async (req, res, next) => {
  try {
    const body = req.body;
    await UserSchema.create({ ...body });
    res.send("ok");
  } catch (error) {
    next(error);
  }
};
