// 요청 DTO: body → 내부 데이터 형태
export const requestToStore = (body) => ({
  name: body.name,
  address: body.address,
  region: body.region,
});

// 응답 DTO: DB 결과 → 클라이언트 반환 형태
export const responseFromStore = (store) => ({
  store_id: store.store_id,
  name: store.name,
  address: store.address,
  region: store.region,
  review: store.review,
  total_star: store.total_star,
  created_at: store.created_at,
});
