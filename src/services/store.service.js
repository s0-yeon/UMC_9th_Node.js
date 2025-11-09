import { addStoreInDB } from "../repositories/store.repository.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";
import { prisma } from "../db.config.js";

export const addStore = async (storeData) => {
   return await prisma.$transaction(async (tx) => { // $transaction의 결과를 이 서비스 함수의 결과로 반환
    
    // DB에 새 가게 추가
    const storeId = await addStoreInDB(tx, storeData);

    // 삽입된 store 데이터 다시 조회
    const createdStore = await tx.store.findUnique({
      where: { storeId },
    });

    return createdStore;  // 트랜잭션 내부에서 DB 작업 결과를 Prisma에 반환
  });
};

export const listStoreReviews = async (storeId, cursor = 0) => {
  const reviews = await getAllStoreReviews(Number(storeId),Number(cursor));
  return responseFromReviews(reviews);
};