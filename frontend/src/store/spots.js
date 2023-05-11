import { csrfFetch } from "./csrf";
//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOTS'
export const ADD_SPOT = 'spots/ADD_SPOT'
export const ADD_IMAGE = 'spots/ADD_IMAGE'
export const EDIT_SPOT = 'spots/EDIT_SPOT'

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

export const changeSpot = (spot) => ({
    type: EDIT_SPOT,
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

    export const getOwnerSpots = () => async (dispatch) => {
        const response = await fetch('/api/spots/current')
        const spots = await response.json()
        dispatch(loadSpots(spots))
    }

    export const createSpot = (spot) => async (dispatch) => {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        })
        const aSpot = await response.json()
        //response.ok condition
        if(spot.spotImages) {
            spot.spotImages.forEach(async (eachImage) => {
                await csrfFetch(`/api/spots/${aSpot.id}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eachImage)
                })
            })
        }

        if(response.ok) {
            dispatch(addSpot(aSpot))
            // dispatch(addImage(response1))
            return aSpot
        }
    }

    export const editSpot = (spot, spotId) => async (dispatch) => {
        const response = await fetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        })
        if(response.ok) {
            const edittedSpot = await response.json()
            dispatch(changeSpot(edittedSpot))
            return edittedSpot
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
            return {...state, singleSpot: action.spot, allSpots: action.spot}
        // case ADD_IMAGE:
        //     return {...state, singleSpot: action.url}
        case EDIT_SPOT:
            return {...state, singleSpot: action.spot}
        default:
            return state
    }
}

export default spotsReducer;
