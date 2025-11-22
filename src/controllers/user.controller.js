import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

// 회원가입 컨트롤러
export const handleUserSignUp = async (req, res, next) => {
   /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
               password: { type: "string"}, 
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
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
  console.log("📨 회원가입 요청이 들어왔습니다!");
 // console.log("🔥 req.headers.content-type:", req.headers["content-type"]);
  console.log("🔥 req.body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  
  res.status(StatusCodes.CREATED).success(user);
};

export const updateMyInfo = async (req, res, next) => {
  /**
 *  #swagger.tags = ["Users"]
 *  #swagger.summary = "내 정보 수정"
 *  #swagger.description = "JWT로 인증한 사용자가 자신의 정보를 수정합니다."
 */

  try {
    const userId = req.user.userId; // JWT 인증에서 받아온 값

    const {
      name,
      phoneNumber,
      birth,    // "2000-01-01"
      gender,
      address,
      detailAddress,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        name: name ?? undefined,
        phoneNumber: phoneNumber ?? undefined,
        birth: birth ? new Date(birth) : undefined,
        gender: gender ?? undefined,
        address: address ?? undefined,
        detailAddress: detailAddress ?? undefined,
      },
    });

    res.success({
      message: "내 정보가 성공적으로 수정되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
