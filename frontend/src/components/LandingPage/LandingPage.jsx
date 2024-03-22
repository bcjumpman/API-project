import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import Spot from "./Spot";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots); // Accessing spots directly from state

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  // Convert spots object to array
  const spotsArray = Object.keys(spots).map((key) => spots[key]);

  return (
    <div className="container">
      <div className="spot-container">
        {spotsArray.map((spot) => (
          <Spot spot={spot} key={spot.id} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
