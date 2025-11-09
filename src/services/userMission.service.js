import {
  addUserMissionInDB,
  getUserMissionsInProgress,
  updateUserMissionStatus,
} from "../repositories/userMission.repository.js";

// ✅ 1. 미션 도전 (user_mission 등록)
export const challengeMission = async (data) => {
 //새 도전 등록
    const userMission = await addUserMissionInDB(data);
    // 4️⃣ 반환
    return userMission;

};

// ✅ 2. 내가 진행 중인 미션 목록 조회
export const listUserMissions = async (userId) => {
  return await getUserMissionsInProgress(userId);
};

// ✅ 미션 완료 처리
export const completeUserMission = async (userId, userMissionId) => {

  const updatedMission = await updateUserMissionStatus(userId, userMissionId, "완료");
  

  return updatedMission;
};