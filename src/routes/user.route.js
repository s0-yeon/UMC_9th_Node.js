// src/routes/user.route.js
import express from "express";
import { handleUserSignUp } from "../controllers/user.controller.js";
import { updateMyInfo } from "../controllers/user.controller.js";
import { isLogin } from "../middleware/auth.js";
export const router = express.Router();

// ✅ 회원가입 라우트 연결
router.post("/signup", handleUserSignUp);

// 내 정보 수정
router.patch("/me", isLogin, updateMyInfo);