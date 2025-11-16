// src/repositories/user.repository.js
import {
  DuplicateUserEmailError,
  InternalServerError,
  CustomError,
} from '../errors/customError.js';

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