import { requestToUserMission, responseFromUserMission } from "../dtos/userMission.dto.js";
import {
  challengeMission,
  listUserMissions,
  completeUserMission,
} from "../services/userMission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleChallengeMission = async (req, res,next) => {
  /*
  #swagger.summary = '미션 도전 등록 API';

  #swagger.parameters['missionId'] = {
    in: 'path',
    description: '도전할 미션 ID',
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
            userId: {
              type: "number",
              example: 5,
              description: "미션에 도전하는 사용자 ID"
            },
            storeId: {
              type: "number",
              example: 10,
              description: "미션이 속한 가게 ID (body에서 함께 전달)"
            },
            timeLimit: {
              type: "number",
              nullable: true,
              example: 1800,
              description: "미션 수행 제한 시간(초 단위)"
            }
          },
          required: ["userId", "storeId"]   // timeLimit은 선택값
        }
      }
    }
  };

#swagger.responses[201] = {
  description: "미션 도전 등록 성공",
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
                  userMissionId: { type: "number" },
                  userId: { type: "number" },
                  missionId: { type: "number" },
                  storeId: { type: "number" },
                  status: { type: "string", example: "수행중" },
                  acceptAt: { type: "string", format: "date-time" },
                  timeLimit: { type: "number" },
                  doneAt: { type: "string", format: "date-time", nullable: true, example: null }, // ⭐ NEW
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
    description: "미션 도전 등록 실패 (잘못된 요청 / 이미 도전 중)",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "UM001" },
                reason: { type: "string", example: "이미 진행 중인 미션입니다." },
                data: { type: "object" }
              }
            },
            success: { type: "object", example: null, nullable: true }
          }
        }
      }
    }
  };
*/

  try {
    const { missionId } = req.params;
    const userMissionData = requestToUserMission(req.body, missionId);

    const newUserMission = await challengeMission(userMissionData);

    res.status(StatusCodes.CREATED).success({
      message: "미션 도전 등록 성공",
      data: responseFromUserMission(newUserMission),
    });
  } catch (error) {
    next(error);
  }
};
// 내가 진행 중인 미션 목록 조회
export const handleListUserMissions = async (req, res, next) => {
  /*
  #swagger.summary = '내가 진행 중인 미션 목록 조회 API'

  #swagger.parameters['userId'] = {
    in: 'path',
    description: '조회할 사용자 ID',
    required: true,
    type: 'number'
  };

  #swagger.parameters['cursor'] = {
    in: 'query',
    description: '커서 기반 페이지네이션 값 (마지막 userMissionId)',
    required: false,
    type: 'number'
  };

  #swagger.responses[200] = {
    description: "진행 중인 미션 목록 조회 성공",
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
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      userMissionId: { type: "number", example: 12 },
                      userId: { type: "number", example: 5 },
                      missionId: { type: "number", example: 3 },
                      status: { type: "string", example: "수행중" },
                      acceptAt: { type: "string", format: "date-time" },
                      timeLimit: { type: "number", example: 1800 },
                      doneAt: { type: "string", format: "date-time", nullable: true, example: null },
                      createdAt: { type: "string", format: "date-time" },
                      mission: {
                        type: "object",
                        properties: {
                          missionContent: { type: "string", example: "아메리카노 구매 시 100포인트 지급" },
                          givePoint: { type: "number", example: 100 },
                          price: { type: "number", example: 4500 },
                          store: {
                            type: "object",
                            properties: {
                              name: { type: "string", example: "카페 보라" },
                              region: { type: "string", example: "서울" }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true, example: 10 }
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
    description: "잘못된 사용자 ID / 요청 오류",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "UM002" },
                reason: { type: "string", example: "userId는 숫자여야 합니다." },
                data: { type: "object" }
              }
            },
            success: { type: "object", example: null, nullable: true }
          }
        }
      }
    }
  };
*/

  try {
    const { userId } = req.params;
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;
    const missions = await listUserMissions(Number(userId), cursor);

    res.status(StatusCodes.OK).success({
      message: "진행 중인 미션 목록 조회 성공",
      data: missions,
      pagination: {
        cursor: missions.length 
          ? missions[missions.length - 1].userMissionId 
          : null
      }
    });

  } catch (error) {
    next(error);
  }
};

// 진행 중 미션 완료 처리
export const handleCompleteUserMission = async (req, res, next) => {
  /*
  #swagger.summary = '진행 중인 미션 완료 처리 API'

  #swagger.parameters['userId'] = {
    in: 'path',
    description: '사용자 ID',
    required: true,
    type: 'number',
    example: 5
  };

  #swagger.parameters['userMissionId'] = {
    in: 'path',
    description: '유저 미션 ID (완료로 변경할 대상)',
    required: true,
    type: 'number',
    example: 12
  };

  #swagger.requestBody = {
    required: false,
    description: '요청 바디 없음'
  };

  #swagger.responses[200] = {
    description: "미션 완료로 상태 변경 성공",
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
                    userMissionId: { type: "number", example: 12 },
                    userId: { type: "number", example: 5 },
                    missionId: { type: "number", example: 3 },
                    storeId: { type: "number", example: 10 },
                    status: { type: "string", example: "완료" },
                    acceptAt: { type: "string", format: "date-time", example: "2025-11-16T14:30:00.000Z" },
                    timeLimit: { type: "number", example: 1800 },
                    doneAt: { type: "string", nullable: true, format: "date-time", example: "2025-11-16T15:15:22.000Z" },
                    createdAt: { type: "string", format: "date-time", example: "2025-11-16T13:50:00.000Z" }
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
    description: "요청 파라미터 오류 (userId 또는 userMissionId 잘못됨)",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "UM003" },
                reason: { 
                  type: "string", 
                  example: "유효하지 않은 사용자 ID입니다." 
                },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };

  #swagger.responses[404] = {
    description: "해당 미션이 존재하지 않거나 이미 완료됨",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "UM004" },
                reason: { 
                  type: "string", 
                  example: "해당 미션이 존재하지 않거나 이미 완료되었습니다." 
                },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", example: null, nullable: true }
          }
        }
      }
    }
  };
*/

  try {
    const { userId, userMissionId } = req.params;
    
    // 입력 검증
    if (!userId || isNaN(userId)) {
      return res.status(400).error({ message: "유효하지 않은 사용자 ID입니다." });
    }
    if (!userMissionId || isNaN(userMissionId)) {
      return res.status(400).error({ message: "유효하지 않은 미션 ID입니다." });
    }
    
    const updatedMission = await completeUserMission(
      Number(userId),
      Number(userMissionId)
    );
    
    res.status(StatusCodes.OK).success({
      message: "미션 완료로 상태 변경 성공",
      data: updatedMission,
    });
  } catch (error) {
    next(error);
  }
};
