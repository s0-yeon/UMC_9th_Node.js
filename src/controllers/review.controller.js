import { StatusCodes } from "http-status-codes";
import { requestToReview, responseFromReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  /*
  #swagger.summary = '리뷰 등록 API';

  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '리뷰를 등록할 가게 ID',
    required: true,
    type: 'number'
  };

  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string", example: "친절하고 맛집!" },
            content: { type: "string", example: "사장님 친절하시고 음식이 정말 맛있어요!" },
            star: { type: "number", example: 5 }
          },
          required: ["title", "content", "star"]
        }
      }
    }
  };

  #swagger.responses[201] = {
    description: "리뷰 등록 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    reviewId: { type: "number", example: 1 },
                    userId: { type: "number", example: 5 },
                    storeId: { type: "number", example: 3 },
                    title: { type: "string", example: "친절하고 맛집!" },
                    content: { type: "string", example: "사장님 친절하시고 음식이 정말 맛있어요!" },
                    star: { type: "number", example: 5 },
                    createdAt: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "리뷰 등록 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R001" },
                reason: { type: "string", example: "별점은 1~5 사이여야 합니다." },
                data: { type: "object" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/
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
