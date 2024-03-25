import { csrfFetch } from "./csrf";

export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const POST_REVIEW = "reviews/POST_REVIEW";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";

export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const postReview = (review) => ({
  type: POST_REVIEW,
  review,
});

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

//Thunk
//* get reviews
export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews;
  }
};

//* create a review
export const createReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = response.json();
    dispatch(postReview(review));
    return newReview;
  }
};

//* delete review
export const eraseReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

//Reducer
const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const reviewsState = {};
      action.reviews.Reviews.forEach((review) => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    }
    case POST_REVIEW: {
      return { ...state, [action.review.id]: action.review };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
