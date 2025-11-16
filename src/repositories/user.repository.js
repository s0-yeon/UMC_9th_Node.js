// src/repositories/user.repository.js
import {
  DuplicateUserEmailError,
  InternalServerError,
  CustomError,
} from '../errors/customError.js';
import { prisma } from "../db.config.js";

export const addUser = async (u) => {
  try {
    const existingUserEmail = await prisma.user.findUnique({
      where: { email: u.email },
    });
    if (existingUserEmail) {
      throw new DuplicateUserEmailError('이미 존재하는 이메일입니다.', u);
    }

    if (!u.password) {
      // u.password로 수정
      throw new CustomError(
        '비밀번호가 누락되었습니다. password 필드를 확인하세요.',
        400,
        'PASSWORD_REQUIRED'
      );
    }

    const created = await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        gender: u.gender,
        birth: u.birth,
        address: u.address ?? null,
        detailAddress: u.detailAddress ?? null,
        phoneNumber: u.phoneNumber,
        passwordHash: u.password,
      },
      select: { userId: true },
    });
    return created.userId;
  } catch (error) {
    // 커스텀 에러는 그대로 전파
    if (error instanceof CustomError || error.errorCode) {
      throw error;
    }
    console.error(error);
    throw new InternalServerError('사용자 추가 중 오류가 발생했습니다.');
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { userId: userId } });
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
  try {
  const preferences = await prisma.userFavorCategory.findMany({
    select: { //JOIN
      userFavorCategoryId: true,
      userId: true,
      foodCategoryId: true, 
      foodCategory: true, /// JOIN을 통해 카테고리 상세 정보를 함께 조회
    },
    where: { userId: userId }, //특정한 유저의 선호 데이터만 조회
    orderBy: { foodCategoryId: "asc" }, // 오름차순으로 정렬
  });

  return preferences;
} catch (error) {
  throw internalServerError("사용자 선호음식 카테고리 조회 중 오류가 발생했습니다.");
} 
};