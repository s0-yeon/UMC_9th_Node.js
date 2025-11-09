import { addReviewInDB } from "../repositories/review.repository.js";
import { prisma } from "../db.config.js";


export const addReview = async (reviewData) => {
  return await prisma.$transaction(async (tx) => { // $transaction 안에서는 반드시 tx를 써야 같은 트랜잭션 안에서 실행
    const reviewId = await addReviewInDB(reviewData,tx);

    //  등록된 리뷰 다시 조회
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
