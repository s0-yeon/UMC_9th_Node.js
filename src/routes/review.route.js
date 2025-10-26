import express from "express";
import { handleAddReview } from "../controllers/review.controller.js";

const router = express.Router();

// 1-2. 가게에 리뷰 추가하기
router.post("/:storeId/reviews", handleAddReview);

export default router;
