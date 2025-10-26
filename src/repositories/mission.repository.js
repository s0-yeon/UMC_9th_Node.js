// ✅ 가게 존재 여부 확인
export const findStoreById = async (connection, storeId) => {
  const [rows] = await connection.query(
    "SELECT * FROM store WHERE store_id = ?",
    [storeId]
  );
  return rows[0];
};

// ✅ 미션 추가
export const addMissionInDB = async (connection, missionData) => {
  const { store_id, region, mission_content, give_point, price } = missionData;

  const [result] = await connection.execute(
    `INSERT INTO mission (store_id, region, mission_content, give_point, price, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [store_id, region, mission_content, give_point, price]
  );

  return result.insertId;
};
