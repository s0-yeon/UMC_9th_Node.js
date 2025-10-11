export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};


// 📤 DB 결과 → 클라이언트 응답용 변환
export const responseFromUser = ({ user, preferences }) => {
  return {
    userId: user.user_id || user.id,   // DB 컬럼명에 따라 조정
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detail_address || user.detailAddress,
    phoneNumber: user.phone_number || user.phoneNumber,
    preferences: preferences.map((pref) => ({
      id: pref.preference_id || pref.id,
      name: pref.preference_name || pref.name,
    })),
    createdAt: user.created_at || user.createdAt || null,
    updatedAt: user.updated_at || user.updatedAt || null,
  };
};