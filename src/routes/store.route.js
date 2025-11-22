import express from "express";
import { handleAddStore } from "../controllers/store.controller.js";
import { isLogin } from "../index.js";
const router = express.Router();

// 1-1. 특정 지역에 가게 추가하기
router.post("/",isLogin, handleAddStore);

export default router;
