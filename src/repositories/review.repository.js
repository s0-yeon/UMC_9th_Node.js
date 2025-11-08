import { PrismaClient } from "@prisma/client";
import { prisma } from "../db.config.js";

// 가게 존재 여부 확인
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { store_id: Number(storeId) },
  });
  return store;
};

// 리뷰 추가
export const addReviewInDB = async (reviewData) => {
  const { user_id, store_id, title, content, star } = reviewData;

  const review = await prisma.review.create({
    data: {
      user_id: Number(user_id),
      store_id: Number(store_id),
      title,
      content,
      star,
    },
  });

  return review.review_id; // 기존 insertId와 동일한 역할
};

// // ✅ 3️⃣ 특정 가게의 미션 목록 조회
// export const getMissionsByStoreId = async (storeId) => {
//   return await prisma.mission.findMany({
//     where: { storeId,
//       ...(cursor ? { missionId: { lt: Number(cursor) } } : {}),
//      },
//     orderBy: { missionId: "desc" },
//     take: 5,
//     select: {
//       missionId: true,
//       region: true,
//       missionContent: true,
//       givePoint: true,
//       price: true,
//       createdAt: true,
//       store: {
//         select: { name: true },
//       },
//     },
//   });

//   return missions.reverse();
// };