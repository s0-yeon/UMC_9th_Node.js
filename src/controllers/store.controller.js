import { requestToStore, responseFromStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";



export const handleAddStore = async (req, res, next) => {
   /*
      #swagger.summary = '가게 등록 API';

  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            region: { type: "string" },
            address: { type: "string" }
          }
        }
      }
    }
  };

  #swagger.responses[201] = {
    description: "가게 등록 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", example: null, nullable: true },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    storeId: { type: "number", example: 1 },
                    name: { type: "string", example: "카페 보라" },
                    address: { type: "string", example: "서울시 강남구" },
                    region: { type: "string", example: "서울" },
                    review: { type: "object", nullable: true, example: null },
                    totalStar: { type: "number", example: 4.5 },
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
  */
  try {
    // 요청 본문(JSON) → DTO 변환
    console.log("🔥 req.body:", req.body); // ✅ body 확인용 로그
    const storeData = requestToStore(req.body);

    // 서비스 계층에서 가게 추가
    const newStore = await addStore(storeData);

    res.status(StatusCodes.CREATED).success({
      message: "가게 등록 성공",
      data: responseFromStore(newStore),
    });
  } catch (error) {
    next(error);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
   /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const reviews = await listStoreReviews(
    req.params.storeId,
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
