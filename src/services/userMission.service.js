import { pool } from "../db.config.js";
import {
  findMissionById,
  findUserMissionDuplicate,
  addUserMissionInDB,
} from "../repositories/userMission.repository.js";

export const challengeMission = async (data) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ✅ 1. 미션 존재 여부 확인
    const mission = await findMissionById(connection, data.mission_id);
    if (!mission) throw new Error("해당 미션이 존재하지 않습니다.");

    // ✅ 2. 중복 도전 여부 확인
    const isDuplicate = await findUserMissionDuplicate(
      connection,
      data.user_id,
      data.mission_id
    );
    if (isDuplicate) throw new Error("이미 도전 중인 미션입니다.");

    // ✅ 3. 도전 등록
    const userMissionId = await addUserMissionInDB(connection, data);

    // ✅ 4. 새로 등록된 user_mission 조회
    const [rows] = await connection.query(
      "SELECT * FROM user_mission WHERE user_mission_id = ?",
      [userMissionId]
    );

    await connection.commit();
    return rows[0];
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
