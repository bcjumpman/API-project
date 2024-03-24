import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSpot } from "../../store/spots";
import { fetchReviews } from "../../store/reviews";
import Reviews from "../Reviews";
import "./SpotDetails.css";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.session.user);

  // console.log("SESSION USER==>", sessionUser);

  const reserveBtn = (e) => {
    e.preventDefault();
    alert("Feature coming soon");
  };

  useEffect(() => {
    dispatch(fetchSpot(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="spot-details-container">
      <div className="spot-header">
        <h2>{spot?.name}</h2>
        <p>
          {spot?.city}, {spot?.state}, {spot?.country}
        </p>
        <div className="spot-image-container">
          {spot &&
            spot.SpotImages &&
            spot.SpotImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                className={`spot-img-${index}`}
              />
            ))}
        </div>
      </div>
      <div className="spot-details">
        <div className="spot-description">
          <h3>
            Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
          </h3>
          <p>{spot?.description}</p>
        </div>
        <div className="reserve-container">
          <div className="reserve-top">
            <p>${spot?.price} night</p>
            {spot?.numReviews === 0 ? (
              <div className="reserve-top-right">
                <i className="fa-solid fa-star" />
                <span>New</span>
              </div>
            ) : (
              <div className="reserve-top-right">
                <i className="fa-solid fa-star" />
                {Number(spot?.avgStarRating).toFixed(1)}
                <span> · </span>
                {spot?.numReviews} {spot?.numReviews > 1 ? "reviews" : "review"}
              </div>
            )}
          </div>
          <button className="reserve-btn" onClick={reserveBtn}>
            Reserve
          </button>
        </div>
      </div>
      <div className="reviews-container">
        <div className="reviews-header">
          <div>
            {spot?.numReviews === 0 ? (
              <div>
                <i className="fa-solid fa-star" />
                <span>New</span>
              </div>
            ) : (
              <div className="">
                <i className="fa-solid fa-star" />
                {Number(spot?.avgStarRating).toFixed(1)}
                <span> · </span>
                {spot?.numReviews} {spot?.numReviews > 1 ? "reviews" : "review"}
              </div>
            )}
          </div>
        </div>
        {Object.keys(reviews).length ? (
          <Reviews />
        ) : (
          sessionUser &&
          sessionUser.id !== spot?.ownerId && (
            <p>Be the first to post a review!</p>
          )
        )}
      </div>
    </div>
  );
}
export default SpotDetails;
