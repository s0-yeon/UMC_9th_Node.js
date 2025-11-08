// 요청 DTO
export const requestToReview = (body, storeId) => ({
  userId: body.userId,
  storeId: parseInt(storeId, 10),
  title: body.title,
  content: body.content,
  star: body.star,
});

// 응답 DTO
export const responseFromReview = (review) => ({
  reviewId: review.reviewId,
  userId: review.userId,
  storeId: review.storeId,
  title: review.title,
  content: review.content,
  star: review.star,
  createdAt: review.createdAt,
});
