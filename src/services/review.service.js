import { pool } from "../db.config.js";
import { addReviewInDB, findStoreById } from "../repositories/review.repository.js";

export const addReview = async (reviewData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ✅ 1. 가게 존재 여부 검증
    const store = await findStoreById(connection, reviewData.store_id);
    if (!store) throw new Error("해당 가게가 존재하지 않습니다.");

    // ✅ 2. 리뷰 추가
    const reviewId = await addReviewInDB(connection, reviewData);

    // ✅ 3. 등록된 리뷰 다시 조회
    const [rows] = await connection.query(
      "SELECT * FROM review WHERE review_id = ?",
      [reviewId]
    );

    await connection.commit();
    return rows[0];
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
