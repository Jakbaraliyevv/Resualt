// import { Schema, model } from "mongoose";

// const userSchema = new Schema(
//   {
//     first_name: {
//       type: String,
//       required: [true, "First name is required"],
//       trim: true,
//     },
//     last_name: {
//       type: String,
//       required: [true, "Last name is required"],
//       trim: true,
//     },
//     phone_number: {
//       type: String,
//       required: [true, "Phone number is required"],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       trim: true,
//     },
//   },
//   {
//     versionKey: false,
//   }
// );

// const UserSchema = model("User", userSchema);
// export default UserSchema;

import { Schema, model } from "mongoose";

const userSchema1 = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // ✅ Foydalanuvchi email tasdiqlamaguncha false bo‘ladi.
    },
    verificationCode: {
      type: String, // ✅ Tasdiqlash kodi string bo‘lishi kerak.
      required: false,
    },
    verificationExpires: {
      type: Date, // ✅ Kodning amal qilish muddati.
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

const UserSchema = model("User", userSchema1);
export default UserSchema;
