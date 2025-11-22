import { CustomError } from "../errors/customError.js";

export const errorHandler = (err, req, res, next) => {
  // ✅ CustomError로 정의된 에러인 경우
  if (err instanceof CustomError) {
    console.error(`❌ [${err.errorCode}] ${err.message}`);
    return res.status(err.statusCode).json({
      resultType: "FAIL",
      error: {
        errorCode: err.errorCode || "UNKNOWN_ERROR",
        reason: err.message,
        data: err.data || null,
      },
      success: null,
    });
  }

  // ✅ 예상치 못한 에러 (CustomError가 아님)
  console.error("Unexpected Error:", err);
  return res.status(500).json({
    resultType: "FAIL",
    error: {
      errorCode: "INTERNAL_SERVER_ERROR",
      reason: "서버 내부 오류가 발생했습니다.",
      data: err.stack || null,
    },
    success: null,
  });
};
