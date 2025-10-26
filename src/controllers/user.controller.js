import { userSignUp } from "../services/user.service.js";

// 회원가입 컨트롤러
export const handleUserSignUp = async (req, res) => {
  console.log("📨 회원가입 요청이 들어왔습니다!");
  console.log("🔥 req.headers.content-type:", req.headers["content-type"]);
  console.log("🔥 req.body:", req.body);

  try {
    const result = await userSignUp(req.body);
    res.status(201).json({
      message: "✅ 회원가입이 완료되었습니다.",
      user: result,
    });
  } catch (err) {
    console.error("❌ handleUserSignUp Error:", err);
    res.status(400).json({ message: err.message });
  }
};
