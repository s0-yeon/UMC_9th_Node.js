import { prisma } from "../db.config.js";



export const addStoreInDB = async (storeData) => {
  const { name, address, region } = storeData;

  const store = await prisma.store.create({
    data: {
      name,
      address,
      region,
      // review, total_star 컬럼이 있다면 0으로 초기화
      review: 0,
      totalStar: 0,
    },
  });

  return store.storeId; // 기존 result.insertId 역할
};


export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    where: {
      storeId: Number(storeId),          //  문자열 숫자로 변환
      ...(cursor ? { reviewId: { lt: Number(cursor) } } : {}),  // 커서 숫자로 변환
    },
    orderBy: { reviewId: "desc" },
    select: {
      reviewId: true,
      content: true,
      storeId: true,
      userId: true,
      star: true,
      createdAt: true,
      user: {
        select: { name: true, email: true },
      },
      store: {
        select: { name: true, region: true },
      },
    },
    take: 5,
  });

  return reviews.reverse(); // 최신 리뷰가 마지막에 오도록 순서 변경
};
