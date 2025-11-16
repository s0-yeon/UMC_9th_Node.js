import { requestToMission, responseFromMission } from "../dtos/mission.dto.js";
import { addMission, listMissionsByStore } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddMission = async (req, res, next) => {
  /*
  #swagger.summary = '미션 등록 API';

  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '미션을 등록할 가게 ID',
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
            region: { type: "string", example: "서울" },
            missionContent: { type: "string", example: "아메리카노 구매 시 스탬프 적립" },
            givePoint: { type: "number", example: 100 },
            price: { type: "number", example: 4500 }
          },
          required: ["region", "missionContent", "givePoint", "price"]
        }
      }
    }
  };

  #swagger.responses[201] = {
    description: "미션 등록 성공",
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
                    missionId: { type: "number", example: 1 },
                    storeId: { type: "number", example: 3 },
                    region: { type: "string", example: "서울" },
                    missionContent: { type: "string", example: "아메리카노 구매 시 스탬프 적립" },
                    givePoint: { type: "number", example: 100 },
                    price: { type: "number", example: 4500 },
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
    description: "미션 등록 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M001" },
                reason: { type: "string", example: "가격은 0보다 커야 합니다." },
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
    const missionData = requestToMission(req.body, storeId);

    const newMission = await addMission(missionData);

    res.status(StatusCodes.CREATED).success({
      message: "미션 등록 성공",
      data: responseFromMission(newMission),
    });
  } catch (error) {
      next(error); // ✅ 에러 미들웨어로 전달
  }
};

// ✅ 2. 특정 가게의 미션 목록 조회
export const handleListMissionsByStore = async (req, res, next) => {
  /*
  #swagger.summary = '특정 가게의 미션 목록 조회 API';

  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '미션을 조회할 가게 ID',
    required: true,
    type: 'number'
  };

  #swagger.parameters['cursor'] = {
    in: 'query',
    description: '커서 기반 페이지네이션 값 (마지막 미션 ID)',
    required: false,
    type: 'number'
  };

  #swagger.responses[200] = {
    description: "미션 목록 조회 성공",
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
                      missionId: { type: "number", example: 10 },
                      region: { type: "string", example: "서울" },
                      missionContent: { type: "string", example: "아메리카노 구매 시 100포인트 지급" },
                      givePoint: { type: "number", example: 100 },
                      price: { type: "number", example: 4500 },
                      createdAt: { type: "string", format: "date-time" },
                      store: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "카페 보라" }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true, example: 5 }
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
    description: "잘못된 요청 또는 입력값 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M002" },
                reason: { type: "string", example: "storeId는 숫자여야 합니다." },
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
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
    const missions = await listMissionsByStore(Number(storeId), cursor);

    res.status(StatusCodes.OK).success({
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].missionId : null,
      }
    });
  } catch (error) {
      next(error);
  }
};