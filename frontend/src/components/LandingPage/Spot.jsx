import { Link } from "react-router-dom";

function Spot({ spot }) {
  return (
    <div className="spot-card" title={spot.name}>
      <Link to={`/spots/${spot.id}`}>
        <img
          src={spot.previewImage}
          alt={spot.name}
          className="spot-card-image"
          key={spot.id}
        />
        <div className="spot-info">
          <p>
            {spot.city}, {spot.state}
          </p>
          <p>
            <i className="fa-solid fa-star" />
            {(spot.avgRating && Number(spot.avgRating).toFixed(1)) || `New`}
          </p>
        </div>
        <p>${spot.price} night</p>
      </Link>
    </div>
  );
}

export default Spot;
