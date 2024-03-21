import { csrfFetch } from "./csrf";
//* action type const
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";

//* Create action
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});
// console.log("LOAD SPOTS:", loadSpots());

export const getSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

// THUNKS
//* Fetch all spots
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    // send to store
    dispatch(loadSpots(spots));
    return spots;
  }
};

//* Fetch one spot
export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    //send to store
    dispatch(getSpot(spot));
    return spot;
  }
};
// console.log("SINGLE SPOT DETAILS:", spot);

// Reducers
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsState = { ...state };
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    case GET_SPOT: {
      return { ...state, [action.spot.id]: action.spot };
    }
    default:
      return state;
  }
};

export default spotsReducer;
