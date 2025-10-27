import express from "express";
import { handleAddMission,handleListMissionsByStore  } from "../controllers/mission.controller.js";

const router = express.Router();

// 1-3. 가게에 미션 추가하기
router.post("/:storeId/missions", handleAddMission);

// ✅ 2. 특정 가게의 미션 목록 조회 (GET)
router.get("/:storeId/missions", handleListMissionsByStore);



export default router;
