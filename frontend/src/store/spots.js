import { csrfFetch } from "./csrf";
//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOTS'
export const ADD_SPOT = 'spots/ADD_SPOT'
export const ADD_IMAGE = 'spots/ADD_IMAGE'

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

//potential
// export const addImage = (url) => ({
//     type: ADD_IMAGE,
//     url,
// })


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

    export const createSpot = (spot) => async (dispatch) => {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        })
        const aSpot = await response.json()
        //response.ok condition
        const response1 = await csrfFetch(`/api/spots/${aSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot.SpotImages)
        })
        if(response.ok) {
            dispatch(addSpot(aSpot))
            // dispatch(addImage(response1))
            return aSpot
        }


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
        // case ADD_IMAGE:
        //     return {...state, singleSpot: action.url}
        default:
            return state
    }
}

export default spotsReducer;
