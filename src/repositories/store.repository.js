import { prisma } from "../db.config.js";


export const addStoreInDB = async (connection, storeData) => {
  const { name, address, region } = storeData;

  const [result] = await connection.execute(
    `INSERT INTO store (name, address, review, total_star, created_at)
     VALUES (?, ?, 0, 0, NOW())`,
    [name, address]
  );

  return result.insertId;
};


export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } }, // 커서 페이지네이션
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
