import { requestToReview, responseFromReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
  try {
    const { storeId } = req.params;
    const reviewData = requestToReview(req.body, storeId);

    const newReview = await addReview(reviewData);

    res.status(201).json({
      message: "리뷰 등록 성공",
      data: responseFromReview(newReview),
    });
  } catch (error) {
    console.error("❌ handleAddReview Error:", error);
    res.status(400).json({ message: error.message });
  }
};
