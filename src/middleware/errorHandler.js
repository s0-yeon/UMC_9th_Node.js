// middleware/errorHandler.js
import { CustomError } from "../errors/customError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  
  console.error("Unexpected Error:", err);
  res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
};