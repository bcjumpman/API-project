import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import "./DeleteSpot.css";

export default function DeleteSpot({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id));
    closeModal();
  };

  return (
    <div className="delete-spot-container">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <button onClick={handleClick} className="delete-spot-button">
        Yes (Delete Spot)
      </button>
      <button onClick={closeModal} className="keep-spot-button">
        No (Keep Spot)
      </button>
    </div>
  );
}
