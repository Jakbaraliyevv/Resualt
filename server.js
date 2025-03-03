import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CustomError } from "./errors/index.js";
import { ResData } from "./utils/response-data.js";
import { connectDB } from "./database/db.connect.js";
import router from "./routes/router.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", router);
const PORT = process.env.PORT || 1717;

app.get("/", (req, res) => {
  res.send("ok");
});

app.use((req, res, next) => {
  try {
    throw CustomError(400, `This ${req.url} page not found`);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const resData = new ResData(statusCode, error.message);
  res.status(resData.status).json(resData);
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server run: http://localhost:${PORT}`);
});
