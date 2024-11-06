import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  accuracy: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
