import { requestToMission, responseFromMission } from "../dtos/mission.dto.js";
import { addMission, listMissionsByStore } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

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
      next(error); // ✅ 에러 미들웨어로 전달
  }
};

// ✅ 2. 특정 가게의 미션 목록 조회
export const handleListMissionsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
    const missions = await listMissionsByStore(Number(storeId), cursor);

    res.status(StatusCodes.OK).json({
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].missionId : null,
      }
    });
  } catch (error) {
      next(error);
  }
};