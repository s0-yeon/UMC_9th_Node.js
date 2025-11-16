import { prisma } from "../db.config.js";
import { StoreNotFoundError,InternalServerError} from "../errors/customError.js";

// 가게 존재 여부 확인
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { storeId: Number(storeId) },
  });
  return store;
};

export const addStoreInDB = async (tx,storeData) => {
  const { name, address, region } = storeData;

  const store = await tx.store.create({
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
  try {

    const store = findStoreById(storeId);
  
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.");
  }
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
} catch (error) {
  throw new InternalServerError("리뷰 목록 조회중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
}
};
