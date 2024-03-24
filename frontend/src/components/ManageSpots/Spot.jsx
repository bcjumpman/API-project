import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";

export default function Spot({ spot }) {
  return (
    <div className="manage-spot-card">
      <Link to={`/spots/${spot.id}`}>
        <img
          src={spot.previewImage}
          alt={spot.name}
          className="manage-spot-card-image"
        />
      </Link>
      <p>
        {spot.city}, {spot.state} <i className="fa-solid fa-star"></i>
        {spot.avgRating || `New`}
      </p>
      <p>${spot.price} night</p>
      <div className="manage-btn-div">
        <div className="manage-spot-btn">
          <Link to={`/spots/${spot.id}/edit`}>Update</Link>
        </div>
        <OpenModalButton
          modalComponent={<DeleteSpot spot={spot} />}
          buttonText="Delete"
          className="manage-spot-modal-btn"
        />
      </div>
    </div>
  );
}
