import {
  findMissionById,
  findUserMissionDuplicate,
  addUserMissionInDB,
  getUserMissionsInProgress,
  updateUserMissionStatus,
} from "../repositories/userMission.repository.js";

// ✅ 1. 미션 도전 (user_mission 등록)
export const challengeMission = async (data) => {
  try {
    // 1️⃣ 미션 존재 여부 확인
    const mission = await findMissionById(data.missionId);
    if (!mission) throw new Error("해당 미션이 존재하지 않습니다.");

    // 2️⃣ 이미 도전 중인지 확인
    const isDuplicate = await findUserMissionDuplicate(data.userId, data.missionId);
    if (isDuplicate) throw new Error("이미 도전 중인 미션입니다.");

    // 3️⃣ 새 도전 등록
    const userMission = await addUserMissionInDB(data);

    // 4️⃣ 반환
    return userMission;
  } catch (error) {
    console.error("❌ challengeMission Error:", error);
    throw error;
  }
};

// ✅ 2. 내가 진행 중인 미션 목록 조회
export const listUserMissions = async (userId) => {
  return await getUserMissionsInProgress(userId);
};

// ✅ 미션 완료 처리
export const completeUserMission = async (userId, userMissionId) => {
  // 1️⃣ 진행 중 미션이 맞는지 확인
  const updatedMission = await updateUserMissionStatus(userId, userMissionId, "완료");
  if (!updatedMission) throw new Error("해당 미션이 존재하지 않거나 이미 완료되었습니다.");

  return updatedMission;
};