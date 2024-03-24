import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";

export default function DeleteSpot({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id));
    closeModal();
  };

  return (
    <div className="container">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <button onClick={handleClick} className="delete-spot-btn">
        Yes (Delete Spot)
      </button>
      <button onClick={closeModal} className="keep-spot-btn">
        No (Keep Spot)
      </button>
    </div>
  );
}
