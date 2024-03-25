import { useState, useEffect } from "react";
import { createReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateReview.css";

export default function CreateReview({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (review.length < 10)
      errors.review = "Review must be at least 10 characters";
    if (rating < 1) errors.rating = "Rating is required";
    setValidationErrors(errors);
  }, [review, rating]);

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    setActiveRating(newRating);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);

  //   // Check if there are validation errors
  //   if (Object.keys(validationErrors).length > 0) return;

  //   const newReview = { review, stars: rating };
  //   const createdReview = await dispatch(createReview(spotId, newReview));

  //   // Check if the review was successfully created
  //   if (createdReview) {
  //     // Reset form state
  //     setReview("");
  //     setRating(0);
  //     setActiveRating(0);

  //     // Close the modal after the review is successfully created
  //     closeModal();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) return;

    const newReview = { review, stars: rating };
    const response = await dispatch(createReview(spotId, newReview));

    // Check if the review was successfully created
    if (response && response.error) {
      // Display server error below the title
      setValidationErrors({ serverError: response.error });
    } else {
      // Reset form state and close the modal
      setReview("");
      setRating(0);
      setActiveRating(0);
      closeModal();
    }
  };

  return (
    <div className="post-review-container">
      <h2>How was your stay?</h2>
      {submitted && validationErrors.errors && `${validationErrors.errors}`}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="5"
          cols="33"
        />
        <div
          className="rating-container"
          onMouseLeave={() => setActiveRating(rating)}
        >
          <div
            onMouseEnter={() => setActiveRating(1)}
            onClick={() => handleRatingClick(1)}
          >
            {activeRating >= 1 ? (
              <i className="fa-solid fa-star" />
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </div>
          <div
            onMouseEnter={() => setActiveRating(2)}
            onClick={() => handleRatingClick(2)}
          >
            {activeRating >= 2 ? (
              <i className="fa-solid fa-star" />
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </div>
          <div
            onMouseEnter={() => setActiveRating(3)}
            onClick={() => handleRatingClick(3)}
          >
            {activeRating >= 3 ? (
              <i className="fa-solid fa-star" />
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </div>
          <div
            onMouseEnter={() => setActiveRating(4)}
            onClick={() => handleRatingClick(4)}
          >
            {activeRating >= 4 ? (
              <i className="fa-solid fa-star" />
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </div>
          <div
            onMouseEnter={() => setActiveRating(5)}
            onClick={() => handleRatingClick(5)}
          >
            {activeRating >= 5 ? (
              <i className="fa-solid fa-star" />
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </div>
          <span>Stars</span>
        </div>
        <button
          type="submit"
          className="submit-review-button"
          disabled={Object.values(validationErrors).length}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
