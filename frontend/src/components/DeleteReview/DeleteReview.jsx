import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { eraseReview } from "../../store/reviews";
import "./DeleteReview.css";

function DeleteReview({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const onDelete = async (e) => {
    e.preventDefault();
    dispatch(eraseReview(review.id));
    closeModal();
  };

  return (
    <div className="delete-review-container">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <button className="delete-review-button" onClick={onDelete}>
        Yes (Delete Review)
      </button>
      <button className="delete-review-button-no" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReview;
