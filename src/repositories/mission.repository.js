
import { prisma } from "../db.config.js";
import { 
  StoreNotFoundError,
  InternalServerError,
  CustomError,
} from "../errors/customError.js";
import { findStoreById } from "./store.repository.js";


// 미션 추가
export const addMissionInDB = async (missionData) => {
  const { store_id, region, mission_content, give_point, price } = missionData;

  try {
      const store = findStoreById(store_id);
  
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.");
  }


  const mission = await prisma.mission.create({
    data: {
      store_id: Number(store_id),
      region,
      mission_content,
      give_point,
      price,
    },
  });
} catch (error) {
  throw new InternalServerError("미션 추가중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
}

  return mission.mission_id; // 기존 insertId 역할
};

// ✅ 3️⃣ 특정 가게의 미션 목록 조회
export const getMissionsByStoreId = async (storeId,cursor) => {
  try {
      if (!storeId || isNaN(storeId)) {
    throw new CustomError("유효하지 않은 가게 ID입니다.", 400,'INVALID_STORE_ID');
  }
      const store = findStoreById(storeId);
  
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.");
  }

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
} catch (error) {
  throw new InternalServerError("미션 목록 조회중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
}
};