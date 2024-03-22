import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview/DeleteReview";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Reviews() {
  const sessionUser = useSelector((state) => state.session.user);
  const reviewsState = useSelector((state) => state.reviews);

  const reviews = Object.values(reviewsState).reverse();
  // console.log("SPOT REVIEWS ==>", reviews);

  const getMonth = (review) => {
    const date = new Date(review.createdAt);
    return months[date.getMonth()];
  };

  const getYear = (review) => {
    const date = new Date(review.createdAt);
    return date.getFullYear();
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review?.User?.firstName}</h3>
          <p>
            {getMonth(review)} {getYear(review)}
          </p>
          <p>{review?.review}</p>
          {sessionUser?.id === review.userId && (
            // Code in import above
            <OpenModalButton
              modalComponent={<DeleteReview review={review} />}
              buttonText={"Delete"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Reviews;
