import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSpot } from "../../store/spots";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  // const images = spot? .SpotImages;

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="spot-details-container">
      <div className="spot-header">
        <h2>{spot?.name}</h2>
        <p>
          {spot?.city}
          {spot?.state}
          {spot?.country}
        </p>
        <div className="spot-image-container">
          {/* Check if spot and spot.SpotImages are available before mapping */}
          {spot &&
            spot.SpotImages &&
            spot.SpotImages.map((image, index) => (
              <img key={index} src={image.url} />
            ))}
        </div>
      </div>
    </div>
  );
}
export default SpotDetails;
