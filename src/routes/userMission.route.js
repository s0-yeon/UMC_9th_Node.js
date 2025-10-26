import express from "express";
import { handleChallengeMission } from "../controllers/userMission.controller.js";

const router = express.Router();

// 1-4. 미션 도전하기
router.post("/:missionId/challenge", handleChallengeMission);

export default router;
