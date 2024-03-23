import { csrfFetch } from "./csrf";

//Constants
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";

//Actions
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

export const editSpot = (spot) => ({
  type: UPDATE_SPOT,
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

//* Fetch user spots
export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");

  if (response.ok) {
    const currentSpots = await response.json();
    dispatch(loadSpots(currentSpots));
    return currentSpots;
  }
};

//* Add images to spot
export const addImages = (spotId, images) => async () => {
  const imagesArr = [];

  for (let i = 0; i < images.length; i++) {
    const body = {
      url: images[i],
      preview: i === 0, // Set preview to true only for the first image
    };

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const image = await response.json();
      imagesArr.push(image);
    }
  }

  return imagesArr;
};

//* Edit a spot
export const updateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    console.log("UPDATE", spot);
    dispatch(editSpot(spot));
    return spot;
  } else {
    const error = await response.json();
    return error;
  }
};

//* Create a spot
export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  } else {
    const error = await response.json();
    return error;
  }
};

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
    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
