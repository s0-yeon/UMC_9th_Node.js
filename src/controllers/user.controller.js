import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

// 회원가입 컨트롤러
export const handleUserSignUp = async (req, res) => {
  console.log("📨 회원가입 요청이 들어왔습니다!");
 // console.log("🔥 req.headers.content-type:", req.headers["content-type"]);
  console.log("🔥 req.body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  
  res.status(StatusCodes.OK).success(user);
};
