import { csrfFetch } from "./csrf";
export const LOAD_SPOTS = "spots/LOAD_SPOTS";

//* Create action
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});
// console.log("LOAD SPOTS:", loadSpots());

//* Fetch all spots
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots;
  }
};

//* Reducers
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsState = { ...state };
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
