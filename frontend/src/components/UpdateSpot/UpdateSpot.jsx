import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotForm from "../SpotForm";
import { useEffect } from "react";
import { fetchSpot } from "../../store/spots";

function UpdateSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  return <SpotForm spot={spot} formType={"Update"} />;
}

export default UpdateSpot;
