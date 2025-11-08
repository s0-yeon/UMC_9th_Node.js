import { PrismaClient } from "@prisma/client";

import { prisma } from "../db.config.js";

// 가게 존재 여부 확인
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { storeId: Number(storeId) },
  });
  return store;
};

// 미션 추가
export const addMissionInDB = async (missionData) => {
  const { store_id, region, mission_content, give_point, price } = missionData;

  const mission = await prisma.mission.create({
    data: {
      store_id: Number(store_id),
      region,
      mission_content,
      give_point,
      price,
    },
  });

  return mission.mission_id; // 기존 insertId 역할
};

// ✅ 3️⃣ 특정 가게의 미션 목록 조회
export const getMissionsByStoreId = async (storeId,cursor) => {
  const mission = await prisma.mission.findMany({
    where: { storeId,
      ...(cursor ? {missionId: { lt: Number(cursor) } } : {}), 
    },
    take: 5,
    orderBy: { missionId: "desc" },
    select: {
      missionId: true,
      region: true,
      missionContent: true,
      givePoint: true,
      price: true,
      createdAt: true,
      store: {
        select: { name: true },
      },
    },
  });
  return mission.reverse();
};