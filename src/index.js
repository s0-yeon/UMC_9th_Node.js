import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.jss";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";
import storeRouter from "./routes/store.route.js";
import reviewRouter from "./routes/review.route.js";
import missionRouter from "./routes/mission.route.js";
import userMissionRouter from "./routes/userMission.route.js";
import { userRouter } from "./routes/user.route.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import { isLogin } from "./middleware/auth.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy);
const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//const isLogin = passport.authenticate('jwt', { session: false });
//app.post("/api/v1/users/signup", handleUserSignUp);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// API (route 구조로 연결)
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/stores", reviewRouter);
app.use("/api/v1/stores", missionRouter);
app.use("/api/v1/users", userMissionRouter);
app.use("/api/v1/users", userRouter);



app.get('/mypage', isLogin, (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

app.get("/oauth2/login/google", 
  passport.authenticate("google", { 
    session: false 
  })
);
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
	  session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user; 

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          message: "Google 로그인 성공!",
          tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      }
    });
  }
);

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


 // 전역 오류를 처리하기 위한 미들웨어
app.use(errorHandler); // 모든 라우트 뒤에 추가


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});