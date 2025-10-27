import { addStoreInDB } from "../repositories/store.repository.js";
import { pool } from "../db.config.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";


export const addStore = async (storeData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // DB에 새 가게 추가
    const storeId = await addStoreInDB(connection, storeData);

    // 삽입된 store 데이터 다시 조회
    const [rows] = await connection.query(
      "SELECT * FROM store WHERE store_id = ?",
      [storeId]
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

export const listStoreReviews = async (storeId, cursor = 0) => {
  const reviews = await getAllStoreReviews(Number(storeId),Number(cursor));
  return responseFromReviews(reviews);
};