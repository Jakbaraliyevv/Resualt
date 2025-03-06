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
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    verificationExpires: {
      type: Date,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

const UserSchema = model("User", userSchema1);
export default UserSchema;
