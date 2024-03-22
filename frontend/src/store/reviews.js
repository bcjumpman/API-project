import { csrfFetch } from "./csrf";

export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";

export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
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
    default:
      return state;
  }
};

export default reviewsReducer;
