// ✅ 미션 존재 여부 확인
export const findMissionById = async (connection, missionId) => {
  const [rows] = await connection.query(
    "SELECT * FROM mission WHERE mission_id = ?",
    [missionId]
  );
  return rows[0];
};

// ✅ 중복 도전 여부 확인
export const findUserMissionDuplicate = async (connection, userId, missionId) => {
  const [rows] = await connection.query(
    "SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ? AND status = '수행중'",
    [userId, missionId]
  );
  return rows.length > 0;
};

// ✅ 미션 도전 등록
export const addUserMissionInDB = async (connection, data) => {
  const { user_id, mission_id, store_id, time_limit } = data;

  const [result] = await connection.execute(
    `INSERT INTO user_mission (user_id, mission_id, store_id, status, accept_at, time_limit, created_at)
     VALUES (?, ?, ?, '수행중', NOW(), ?, NOW())`,
    [user_id, mission_id, store_id, time_limit]
  );

  return result.insertId;
};
