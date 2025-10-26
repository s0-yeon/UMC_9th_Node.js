// 요청 DTO
export const requestToReview = (body, storeId) => ({
  user_id: body.user_id,
  store_id: parseInt(storeId, 10),
  title: body.title,
  content: body.content,
  star: body.star,
});

// 응답 DTO
export const responseFromReview = (review) => ({
  review_id: review.review_id,
  user_id: review.user_id,
  store_id: review.store_id,
  title: review.title,
  content: review.content,
  star: review.star,
  created_at: review.created_at,
});
