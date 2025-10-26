// 요청 DTO
export const requestToUserMission = (body, missionId) => ({
  user_id: body.user_id,
  mission_id: parseInt(missionId, 10),
  store_id: body.store_id,
  time_limit: body.time_limit,
});

// 응답 DTO
export const responseFromUserMission = (userMission) => ({
  user_mission_id: userMission.user_mission_id,
  user_id: userMission.user_id,
  mission_id: userMission.mission_id,
  store_id: userMission.store_id,
  status: userMission.status,
  accept_at: userMission.accept_at,
  time_limit: userMission.time_limit,
  done_at: userMission.done_at,
  created_at: userMission.created_at,
});
