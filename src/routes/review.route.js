import express from "express";
import { handleAddReview } from "../controllers/review.controller.js";
import { isLogin } from "../index.js";

const router = express.Router();

// 1-2. 가게에 리뷰 추가하기
router.post("/:storeId/reviews",isLogin, handleAddReview);

export default router;
