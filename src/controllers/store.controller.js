import { requestToStore, responseFromStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
  try {
    // 요청 본문(JSON) → DTO 변환
    const storeData = requestToStore(req.body);

    // 서비스 계층에서 가게 추가
    const newStore = await addStore(storeData);

    res.status(201).json({
      message: "가게 등록 성공",
      data: responseFromStore(newStore),
    });
  } catch (error) {
    console.error("❌ handleAddStore Error:", error);
    res.status(400).json({ message: error.message });
  }
};
