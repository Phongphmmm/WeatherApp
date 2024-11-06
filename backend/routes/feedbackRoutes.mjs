import { Router } from "express";
import { submitFeedback } from "../controllers/feedbackController.mjs";
import { getFeedbacks } from "../controllers/feedbackController.mjs";
const router = Router();

router.post("/", submitFeedback);
router.get("/feedbacks", getFeedbacks);
export default router;
