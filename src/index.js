import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import storeRouter from "./routes/store.route.js";
import reviewRouter from "./routes/review.route.js";
import missionRouter from "./routes/mission.route.js";
import userMissionRouter from "./routes/userMission.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

// API (route 구조로 연결)
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/stores", reviewRouter);
app.use("/api/v1/stores", missionRouter);
app.use("/api/v1/missions", userMissionRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});