import { transport } from "../config/mailer.js";
import UserSchema from "../schema/userschema.js";
import { hashPassword, signInJwt } from "../utils/jwt.js";
import { ResData } from "../utils/response-data.js";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 xonali kod
};

export const signUp = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email allaqachon mavjud!" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserSchema.create({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    const token = signInJwt({ id: newUser._id });

    const verificationCode = generateVerificationCode();
    const expirationTime = Date.now() + 60 * 1000; // 1 daqiqa

    newUser.verificationCode = verificationCode;
    newUser.verificationExpires = expirationTime;
    await newUser.save();

    await transport.sendMail({
      from: process.env.MAIL_NAME,
      to: email,
      subject: "Emailni tasdiqlash kodi",
      text: `Sizning tasdiqlash kodingiz: ${verificationCode}\nKod 1 daqiqa ichida amal qiladi.`,
    });

    const resData = new ResData(201, "success", { user: newUser, token });
    res.status(resData.status).json(resData);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }

    if (
      !user.verificationCode ||
      user.verificationCode.trim() !== code.trim()
    ) {
      return res.status(400).json({ message: "Noto‘g‘ri tasdiqlash kodi!" });
    }

    if (Date.now() > user.verificationExpires) {
      return res.status(400).json({ message: "Tasdiqlash kodi eskirgan!" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpires = null;
    await user.save();

    res.status(200).json({ message: "Email tasdiqlandi!" });
  } catch (error) {
    next(error);
  }
};
