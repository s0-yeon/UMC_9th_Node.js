// ✅ 가게 존재 여부 확인
export const findStoreById = async (connection, storeId) => {
  const [rows] = await connection.query(
    "SELECT * FROM store WHERE store_id = ?",
    [storeId]
  );
  return rows[0];
};

// ✅ 리뷰 추가
export const addReviewInDB = async (connection, reviewData) => {
  const { user_id, store_id, title, content, star } = reviewData;

  const [result] = await connection.execute(
    `INSERT INTO review (user_id, store_id, title, content, star, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [user_id, store_id, title, content, star]
  );

  return result.insertId;
};
