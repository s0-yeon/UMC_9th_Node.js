import { requestToStore, responseFromStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";



export const handleAddStore = async (req, res, next) => {
  try {
    // 요청 본문(JSON) → DTO 변환
    console.log("🔥 req.body:", req.body); // ✅ body 확인용 로그
    const storeData = requestToStore(req.body);

    // 서비스 계층에서 가게 추가
    const newStore = await addStore(storeData);

    res.status(StatusCodes.CREATED).success({
      message: "가게 등록 성공",
      data: responseFromStore(newStore),
    });
  } catch (error) {
    next(error);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    req.params.storeId,
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
