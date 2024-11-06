import express, { json } from "express";
import mongoose from "mongoose";
import feedbackRoutes from "../backend/routes/feedbackRoutes.mjs";
import connectDB from "./config/db.mjs";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
