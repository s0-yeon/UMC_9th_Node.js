import { addMissionInDB,  getMissionsByStoreId } from "../repositories/mission.repository.js";

/**
 * ✅ 특정 가게에 미션 추가
 */
export const addMission = async (missionData) => {
  const mission = await addMissionInDB(missionData);

  return mission;
};

/**
 * ✅ 특정 가게의 미션 목록 조회
 */
export const listMissionsByStore = async (storeId, cursor) => {
  
  return await getMissionsByStoreId(storeId, cursor);
};
