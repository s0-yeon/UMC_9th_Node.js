import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created= await prisma.user.create({ data: data});
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: { //JOIN
      id: true,
      userId: true,
      foodCategoryId: true, 
      foodCategory: true, /// JOIN을 통해 카테고리 상세 정보를 함께 조회
    },
    where: { userId: userId }, //특정한 유저의 선호 데이터만 조회
    orderBy: { foodCategoryId: "asc" }, // 오름차순으로 정렬
  });

  return preferences;
};