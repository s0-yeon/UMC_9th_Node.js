export const addStoreInDB = async (connection, storeData) => {
  const { name, address, region } = storeData;

  const [result] = await connection.execute(
    `INSERT INTO store (name, address, review, total_star, created_at)
     VALUES (?, ?, 0, 0, NOW())`,
    [name, address]
  );

  return result.insertId;
};
