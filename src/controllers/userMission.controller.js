import { requestToUserMission, responseFromUserMission } from "../dtos/userMission.dto.js";
import { challengeMission } from "../services/userMission.service.js";

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
