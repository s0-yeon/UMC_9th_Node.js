import { addMissionInDB, findStoreById, getMissionsByStoreId } from "../repositories/mission.repository.js";

/**
 * ✅ 특정 가게에 미션 추가
 */
export const addMission = async (missionData) => {
  // 1️⃣ 가게 존재 여부 검증
  const store = await findStoreById(missionData.storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 2️⃣ 미션 추가
  const mission = await addMissionInDB(missionData);

  // 3️⃣ 추가된 미션 반환
  return mission;
};

/**
 * ✅ 특정 가게의 미션 목록 조회
 */
export const listMissionsByStore = async (storeId, cursor) => {
  if (!storeId || isNaN(storeId)) {
    throw new CustomError("유효하지 않은 가게 ID입니다.", 400);
  }
  
  const store = await findStoreById(storeId);
  if (!store) {
    throw new CustomError("해당 가게가 존재하지 않습니다.", 404);
  }
  
  return await getMissionsByStoreId(storeId, cursor);
};
