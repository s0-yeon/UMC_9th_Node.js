// src/routes/user.route.js
import express from "express";
import { handleUserSignUp } from "../controllers/user.controller.js";

export const userRouter = express.Router();

// ✅ 회원가입 라우트 연결
userRouter.post("/signup", handleUserSignUp);
