import express from "express";
import { handleAddMission } from "../controllers/mission.controller.js";

const router = express.Router();

// 1-3. 가게에 미션 추가하기
router.post("/:storeId/missions", handleAddMission);

export default router;
