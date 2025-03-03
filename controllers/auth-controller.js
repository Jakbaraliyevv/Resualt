import { transport } from "../config/mailer.js";
import UserSchema from "../schema/userschema.js";
import { hashPassword, signInJwt } from "../utils/jwt.js";
import { ResData } from "../utils/response-data.js";
import { authenticator } from "otplib";

export const signUp = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;

    // 1️⃣ Email avvaldan mavjudligini tekshirish
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email allaqachon mavjud!" });
    }

    // 2️⃣ Parolni xesh qilish
    const hashedPassword = await hashPassword(password);

    // 3️⃣ Yangi foydalanuvchini yaratish
    const newUser = await UserSchema.create({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    // 4️⃣ JWT token yaratish
    const token = signInJwt({ id: newUser._id });

    // 5️⃣ Email tasdiqlash kodi yaratish va vaqtni belgilash
    const verificationCode = authenticator.generate(process.env.SECRET_KEY);
    const expirationTime = Date.now() + 60 * 1000; // 1 daqiqa (60,000 ms)

    // 6️⃣ Foydalanuvchining tasdiqlash kodini bazada saqlash
    newUser.verificationCode = verificationCode;
    newUser.verificationExpires = expirationTime;
    await newUser.save();

    // 7️⃣ Email yuborish
    await transport.sendMail({
      from: process.env.MAIL_NAME,
      to: email,
      subject: "Emailni tasdiqlash kodi",
      text: `Sizning tasdiqlash kodingiz: ${verificationCode}\nKod 1 daqiqa ichida amal qiladi.`,
    });

    // 8️⃣ Muvaffaqiyatli javob qaytarish
    const resData = new ResData(201, "success", { user: newUser, token });
    res.status(resData.status).json(resData);
  } catch (error) {
    next(error);
  }
};

// // 📌 Email tasdiqlash kodini tekshirish
// export const verifyEmail = async (req, res, next) => {
//   try {
//     const { email, code } = req.body;

//     // 1️⃣ Foydalanuvchini bazadan topish
//     const user = await UserSchema.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
//     }

//     // 2️⃣ Tasdiqlash kodini tekshirish
//     if (user.verificationCode !== code) {
//       return res.status(400).json({ message: "Noto‘g‘ri tasdiqlash kodi!" });
//     }

//     // 3️⃣ Kod muddati tekshirish
//     if (Date.now() > user.verificationExpires) {
//       return res.status(400).json({ message: "Tasdiqlash kodi eskirgan!" });
//     }

//     // 4️⃣ Email tasdiqlanganligini belgilash
//     user.isVerified = true;
//     user.verificationCode = null;
//     user.verificationExpires = null;
//     await user.save();

//     // 5️⃣ Muvaffaqiyatli javob qaytarish
//     res.status(200).json({ message: "Email tasdiqlandi!" });
//   } catch (error) {
//     next(error);
//   }
// };
