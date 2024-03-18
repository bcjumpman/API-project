import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import Spot from "./Spot";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="spot-container">
        {spots.map((spot) => (
          <Spot spot={spot} key={spot.id} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
