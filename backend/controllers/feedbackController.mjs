import Feedback from "../models/feedbackModel.mjs";

export async function submitFeedback(req, res) {
  const { accuracy, comment } = req.body;
  try {
    const feedback = new Feedback({ accuracy, comment });
    await feedback.save();
    res.status(201).send({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(400).send({ error: "Failed to submit feedback." });
  }
}
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};
