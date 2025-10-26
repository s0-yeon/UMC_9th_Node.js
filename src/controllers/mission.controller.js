import { requestToMission, responseFromMission } from "../dtos/mission.dto.js";
import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res) => {
  try {
    const { storeId } = req.params;
    const missionData = requestToMission(req.body, storeId);

    const newMission = await addMission(missionData);

    res.status(201).json({
      message: "미션 등록 성공",
      data: responseFromMission(newMission),
    });
  } catch (error) {
    console.error("❌ handleAddMission Error:", error);
    res.status(400).json({ message: error.message });
  }
};
