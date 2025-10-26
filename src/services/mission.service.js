import { pool } from "../db.config.js";
import { addMissionInDB, findStoreById } from "../repositories/mission.repository.js";

export const addMission = async (missionData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ✅ 1. 가게 존재 여부 검증
    const store = await findStoreById(connection, missionData.store_id);
    if (!store) throw new Error("해당 가게가 존재하지 않습니다.");

    // ✅ 2. 미션 추가
    const missionId = await addMissionInDB(connection, missionData);

    // ✅ 3. 등록된 미션 다시 조회
    const [rows] = await connection.query(
      "SELECT * FROM mission WHERE mission_id = ?",
      [missionId]
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
