// 요청 DTO: body → 내부 데이터 형태
export const requestToStore = (body) => ({
  name: body.name,
  address: body.address,
  region: body.region,
});

// 응답 DTO: DB 결과 → 클라이언트 반환 형태
export const responseFromStore = (store) => ({
  storeId: store.storeId,
  name: store.name,
  address: store.address,
  region: store.region,
  review: store.review,
  totalStar: store.totalStar,
  createdAt: store.createdAt,
});

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].reviewId : null,
    },
  };
};
