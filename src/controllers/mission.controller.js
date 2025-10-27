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

// ✅ 2. 특정 가게의 미션 목록 조회
export const handleListMissionsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const missions = await listMissionsByStore(Number(storeId));

    res.status(StatusCodes.OK).json({
      data: missions,
      count: missions.length,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "미션 목록 조회 중 오류 발생" });
  }
};