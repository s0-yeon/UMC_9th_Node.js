import { pool } from "../db.config.js";

// ✅ 유저 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await conn.query(
      `INSERT INTO user (email, name, gender, birth, address, phone_num, password)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.phoneNumber,
        data.password,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// ✅ 사용자 정보 조회
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`SELECT * FROM user WHERE user_id = ?;`, [
      userId,
    ]);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// ✅ 사용자 선호 카테고리 삽입
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// ✅ 사용자 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query(
      `SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name
       FROM user_favor_category ufc
       JOIN food_category fcl ON ufc.food_category_id = fcl.id
       WHERE ufc.user_id = ?
       ORDER BY ufc.food_category_id ASC;`,
      [userId]
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
