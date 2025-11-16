import { prisma } from "../db.config.js"; // ✅ 이거 하나면 충분
import {MissionNotFoundError, UserMissionDuplicateError,InvalidMissionStatusError, InternalServerError } from "../errors/customError.js";

// ✅ 미션 존재 여부 확인
export const findMissionById = async (missionId) => {
  return await prisma.mission.findUnique({
    where: { missionId: Number(missionId) },
  });
};

// ✅ 중복 도전 여부 확인
export const findUserMissionDuplicate = async (userId, missionId) => {
  const existing = await prisma.userMission.findFirst({
    where: {
      userId: Number(userId),
      missionId: Number(missionId),
      status: "수행중",
    },
  });

  return existing !== null; // true면 이미 도전 중
};

// ✅ 미션 도전 등록
export const addUserMissionInDB = async (data) => {
  const { userId, missionId, storeId, timeLimit } = data;
try {
    if (await findMissionById(missionId) === null) {
      throw new MissionNotFoundError("해당 미션이 존재하지 않습니다.");
    }

    else if (await findUserMissionDuplicate(userId, missionId)) {
      throw new UserMissionDuplicateError("이미 도전 중인 미션입니다.");
    }

  const userMission = await prisma.userMission.create({
      data: {
        userId: Number(userId),
        missionId: Number(missionId),
        storeId: Number(storeId),
        timeLimit: Number(timeLimit),
        status: "수행중",
        acceptAt: new Date(),
      },
      select: {
        userMissionId: true,
        userId: true,
        missionId: true,
        storeId: true,
        status: true,
        acceptAt: true,
        timeLimit: true,
        doneAt: true,            
        createdAt: true,
      }
  });

  return userMission; // 기존 insertId 역할
}
catch (error) {
    if ( error instanceof MissionNotFoundError || error instanceof UserMissionDuplicateError) {
      throw error;  // 사용자 에러는 그대로 전달
    }
  throw new InternalServerError("미션 도전 등록중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
};
}

// ✅ 내가 진행 중인 미션 목록 조회
export const getUserMissionsInProgress = async (userId, cursor) => {
  try {
  const missions =  await prisma.userMission.findMany({
    where: {
      userId: Number(userId),
      status: "수행중",
      ...(cursor ? { userMissionId: { lt: Number(cursor) } } : {}),
    },
    orderBy: { userMissionId: "desc" },
    take: 5,
    select: {
      userMissionId: true,
      userId: true,
      missionId: true,
      status: true,
      acceptAt: true,
      timeLimit: true,
      doneAt: true,
      createdAt: true,
      mission: {
        select: {
          missionContent: true,
          givePoint: true,
          price: true,
          store: {
            select: { name: true, region: true },
          },
        },
      },
    },
  });
  return missions.reverse();
} catch (error) {
  throw new InternalServerError("진행 중인 미션 목록 조회중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
}};


// ✅ 미션 상태 업데이트
export const updateUserMissionStatus = async (userId, userMissionId, newStatus) => {
  // 먼저 현재 상태 확인
try {
  const mission = await prisma.userMission.findFirst({
    where: {
      userMissionId: Number(userMissionId),
      userId: Number(userId),
    },
  });

  if (!mission) {
    throw new MissionNotFoundError("해당 미션이 존재하지 않습니다.");
  }
  else if( mission.status === newStatus) {
    throw new InvalidMissionStatusError("이미 완료된 미션입니다.");
  }

  // 상태 업데이트
  const updated = await prisma.userMission.update({
    where: { userMissionId: Number(userMissionId) },
    data: { status: newStatus, ...(newStatus === "완료" ? { doneAt: new Date() } : {})}, // doneAt 하나만 설정하는거라 스프레드 꼭 안써도 되는데 쓰는게 깔끔한 패턴이라나 뭐라나
  });

  return updated;
} catch (error) {

    if (
      error instanceof MissionNotFoundError ||
      error instanceof InvalidMissionStatusError
    ) {
      throw error;
    }

  throw new InternalServerError("미션 상태 업데이트 중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
}
};
