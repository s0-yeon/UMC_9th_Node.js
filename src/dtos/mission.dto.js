// ✅ 요청 DTO 변환
export const requestToMission = (body, storeId) => {
  return {
    storeId: Number(storeId), // ✅ 숫자 변환 확실히!
    region: body.region,
    missionContent: body.missionContent,
    givePoint: body.givePoint,
    price: body.price,
  };
};

// ✅ 응답 DTO 변환
export const responseFromMission = (mission) => {
  return {
    missionId: mission.missionId,
    storeId: mission.storeId,
    region: mission.region,
    missionContent: mission.missionContent,
    givePoint: mission.givePoint,
    price: mission.price,
    createdAt: mission.createdAt,
  };
};
