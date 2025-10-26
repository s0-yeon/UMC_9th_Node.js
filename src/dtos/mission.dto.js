// 요청 DTO
export const requestToMission = (body, storeId) => ({
  store_id: parseInt(storeId, 10),
  region: body.region,
  mission_content: body.mission_content,
  give_point: body.give_point,
  price: body.price,
});

// 응답 DTO
export const responseFromMission = (mission) => ({
  mission_id: mission.mission_id,
  store_id: mission.store_id,
  region: mission.region,
  mission_content: mission.mission_content,
  give_point: mission.give_point,
  price: mission.price,
  created_at: mission.created_at,
});
