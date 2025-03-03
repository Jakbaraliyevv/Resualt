import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, required: true }, // Film nomi
    ageRestriction: { type: Number, required: true }, // Yosh cheklovi (masalan: 13, 18)
    image: { type: String, required: true }, // Rasm URL manzili
    targetAudience: { type: String, required: true }, // Auditoriya (masalan: "For Kids")
    genre: { type: [String], required: true }, // Janrlar ro'yxati (masalan: ["Comedy", "Action"])
    availableDate: { type: String, required: true }, // Qachon mavjud: "Today", "Tomorrow", "Day after tomorrow"
    availableTime: { type: String }, // Vaqt (agar bugungi kun bo'lsa: "14:30")
    format: { type: String, required: true }, // Format: "2D", "3D", "4D"
    price: { type: Number, required: true }, // Chiptaning narxi
    hallNumber: { type: Number, required: true }, // Zal raqami
    director: { type: String, required: true }, // Rejissyor
    duration: { type: Number, required: true }, // Davomiyligi (daqiqalarda)
    country: { type: String, required: true }, // Ishlab chiqaruvchi mamlakat
    year: { type: Number, required: true }, // Ishlab chiqarilgan yil
    description: { type: String, required: true }, // Film haqida qisqacha ma'lumot
  },
  { versionKey: false } // `_v` versiya kalitini qo'shmaslik uchun
);

const movieSchemas = model("Movies", movieSchema);
export default movieSchemas;
