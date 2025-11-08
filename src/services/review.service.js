import { addReviewInDB, findStoreById } from "../repositories/review.repository.js";
import { prisma } from "../db.config.js";


export const addReview = async (reviewData) => {
  return await prisma.$transaction(async (tx) => { // $transaction 안에서는 반드시 tx를 써야 같은 트랜잭션 안에서 실행

    // ✅ 1. 가게 존재 여부 검증
    const store = await tx.store.findUnique({ // findUnique() : 하나의 고유한 레코드(행)를 찾는 메서드
       where: { store_id: Number(reviewData.store_id) }, // reviewData 안에 있는 store_id 값으로 해당되는 가게 존재여부 확인
  });
    if (!store) throw new Error("해당 가게가 존재하지 않습니다.");

    // ✅ 2. 리뷰 추가
    const reviewId = await addReviewInDB(connection, reviewData);

    // ✅ 3. 등록된 리뷰 다시 조회
    const createdReview = await tx.review.findUnique({
      where: { reviewId: review.reviewId },
      include: {
        user: { select: { name: true, email: true } },
        store: { select: { name: true, region: true } },
      },
    });
    return createdReview;

  });
};
