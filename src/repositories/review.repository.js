import { prisma } from "../db.config.js";
import { StoreNotFoundError,InternalServerError} from "../errors/customError.js";
import { findStoreById } from "./store.repository.js";


// 리뷰 추가
export const addReviewInDB = async (reviewData) => {
  const { user_id, store_id, title, content, star } = reviewData;
  
  try {
    const store = await findStoreById(store_id);
  
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.");
  }
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
} catch (error) {
  throw new InternalServerError("리뷰 추가중 오류가 발생했습니다."); // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
}
};
