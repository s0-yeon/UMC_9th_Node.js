import bcrypt from "bcryptjs"; // ✅ bcryptjs 사용 (빌드 불필요)
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

// 회원가입 로직
export const userSignUp = async (data) => {
  console.log("요청으로 들어온 비밀번호:", data.password);


  // ✅ 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(data.password, 10);
  console.log("해싱된 결과:", hashedPassword);

  // ✅ 사용자 데이터 DB에 추가
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phoneNumber: data.phoneNumber,
    password: hashedPassword, // ✅ 해시된 비밀번호 저장
  });


  // ✅ 선호 카테고리 추가
  for (const preference of data.preferences || []) {
    await setPreference(joinUserId, preference);
  }

  // ✅ 가입된 사용자 정보 조회
  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
