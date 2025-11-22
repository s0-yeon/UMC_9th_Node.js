import express from "express";
import { handleChallengeMission,handleListUserMissions,handleCompleteUserMission, } from "../controllers/userMission.controller.js";
import { isLogin } from "../index.js";
const router = express.Router();

// 1-4. 미션 도전하기
router.post("/:missionId/challenge",isLogin, handleChallengeMission);

// ✅ 3. 내가 진행 중인 미션 목록 조회
router.get("/:userId/missions/in-progress",isLogin, handleListUserMissions);

// ✅ 5. 진행 중 미션 완료 처리
router.patch("/:userId/missions/:userMissionId/complete",isLogin, handleCompleteUserMission);

export default router;
