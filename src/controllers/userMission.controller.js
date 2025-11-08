import { requestToUserMission, responseFromUserMission } from "../dtos/userMission.dto.js";
import {
  challengeMission,
  listUserMissions,
  completeUserMission,
} from "../services/userMission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleChallengeMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    const userMissionData = requestToUserMission(req.body, missionId);

    const newUserMission = await challengeMission(userMissionData);

    res.status(201).json({
      message: "미션 도전 등록 성공",
      data: responseFromUserMission(newUserMission),
    });
  } catch (error) {
    console.error("❌ handleChallengeMission Error:", error);
    res.status(400).json({ message: error.message });
  }
};
// 내가 진행 중인 미션 목록 조회
export const handleListUserMissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const missions = await listUserMissions(Number(userId));

    res.status(StatusCodes.OK).json({
      message: "진행 중인 미션 목록 조회 성공",
      data: missions,
      count: missions.length,
    });
  } catch (error) {
    console.error("❌ handleListUserMissions Error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "진행 중인 미션 목록 조회 실패" });
  }
};

// 진행 중 미션 완료 처리
export const handleCompleteUserMission = async (req, res) => {
  try {
    const { userId, userMissionId } = req.params;
    
    // 입력 검증
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    }
    if (!userMissionId || isNaN(userMissionId)) {
      return res.status(400).json({ message: "유효하지 않은 미션 ID입니다." });
    }
    
    const updatedMission = await completeUserMission(
      Number(userId),
      Number(userMissionId)
    );
    
    res.status(StatusCodes.OK).json({
      message: "미션 완료로 상태 변경 성공",
      data: updatedMission,
    });
  } catch (error) {
    console.error("handleCompleteUserMission Error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      message: error.message || "미션 완료 처리 실패" 
    });
  }
};
