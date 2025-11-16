import { StatusCodes } from "http-status-codes";
import { requestToReview, responseFromReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const reviewData = requestToReview(req.body, storeId);

    const newReview = await addReview(reviewData);

    res.status(StatusCodes.CREATED).success({
      message: "리뷰 등록 성공",
      data: responseFromReview(newReview),
    });
  } catch (error) {
    next(error); 
  }
};
