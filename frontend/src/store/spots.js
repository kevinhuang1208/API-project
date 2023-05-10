import { csrfFetch } from "./csrf";
//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOTS'
export const ADD_SPOT = 'spots/ADD_SPOT'

//Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });

export const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot,
})


  //Thunks
  export const getSpot = (spotId) => async (dispatch) => {
      const response = await fetch(`/api/spots/${spotId}`);
      const eachSpot = await response.json();
      dispatch(receiveSpot(eachSpot));
    };

    export const getAllSpots = () => async (dispatch) => {
        const response = await fetch('/api/spots');
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

    export const createSpot = (spot, spotId) => async (dispatch) => {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        })
        const aSpot = await response.json()
        dispatch(addSpot(aSpot))

        const responseUrl = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        })
        dispatch(addSpot(responseUrl))
        return aSpot

    }

const spotsReducer = (state = {singleSpot: {}, allSpots: {}}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = {...state}
            const spotsState = {};

            action.spots.Spots.map((spot) => {
                spotsState[spot.id] = spot;
            })
            newState.allSpots = spotsState
            return newState
        case RECEIVE_SPOT:
            return {...state, singleSpot: action.spot}
        case ADD_SPOT:
            return {...state, singleSpot: action.spot}
        default:
            return state
    }
}

export default spotsReducer;
