// 요청 DTO
export const requestToUserMission = (body, missionId) => ({
  userId: body.userId,
  missionId: parseInt(missionId, 10),
  storeId: body.storeId,
  timeLimit: body.timeLimit,
});

// 응답 DTO
export const responseFromUserMission = (userMission) => ({
  userMissionId: userMission.userMissionId,
  userId: userMission.userId,
  missionId: userMission.missionId,
  storeId: userMission.storeId,
  status: userMission.status,
  acceptAt: userMission.acceptAt,
  timeLimit: userMission.timeLimit,
  doneAt: userMission.doneAt,
  createdAt: userMission.createdAt,
});
