import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import router from "./router/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDB(process.env.MONGO_URI);


app.use("/api", router);

app.listen(4444, () => {
  console.log("Server ok");
});
