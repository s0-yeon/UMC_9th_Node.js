import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  constructor(message, statusCode, errorCode = "UNKNOWN_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode; // ✅ 추가
  }
}

export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 400 Bad Request
export class StoreNotFoundError extends CustomError {
  constructor(message = "존재하지 않는 가게입니다.") {
    super(message, StatusCodes.BAD_REQUEST, "STORE_NOT_FOUND"); // ✅ 정상 저장됨
  }
}

export class UserNotFoundError extends CustomError {
  constructor(message = "존재하지 않는 유저입니다.") {
    super(message, StatusCodes.BAD_REQUEST, "USER_NOT_FOUND"); // ✅ 정상 저장됨
  }
}

// 400 Bad Request
export class MissionNotFoundError extends CustomError {
  constructor(message = "존재하지 않는 미션입니다.") {
    super(message, StatusCodes.BAD_REQUEST, "MISSION_NOT_FOUND");
  }
}

export class UserMissionDuplicateError extends CustomError {
  constructor(message = "이미 도전한 미션입니다.") {
    super(message, StatusCodes.BAD_REQUEST, "USER_MISSION_DUPLICATE");
  }
}

// 409 Conflict
export class InvalidMissionStatusError extends CustomError {
  constructor(message = "진행 중인 미션만 완료할 수 있습니다.") {
    super(message, StatusCodes.CONFLICT, "INVALID_MISSION_STATUS");
  }
}

// 500 Internal Server Error
export class InternalServerError extends CustomError {
  constructor(message = "서버 내부 오류가 발생했습니다.") {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
  }
}