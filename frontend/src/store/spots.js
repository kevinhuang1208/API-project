import { csrfFetch } from "./csrf";
//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
export const ADD_SPOT = 'spots/ADD_SPOT'
export const ADD_IMAGE = 'spots/ADD_IMAGE'
export const EDIT_SPOT = 'spots/EDIT_SPOT'
export const DELETE_SPOT = '/spots/DELETE_SPOT'

//Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });

export const addSpot = (spot, imageUrls) => ({
    type: ADD_SPOT,
    spot,
    imageUrls,
})

export const changeSpot = (spot) => ({
    type: EDIT_SPOT,
    spot,
})

export const removeSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId,
})

// potential
export const addImage = (url) => ({
    type: ADD_IMAGE,
    url,
})


  //Thunks
  export const getSpot = (spotId) => async (dispatch) => {
      const response = await fetch(`/api/spots/${spotId}`);
      const eachSpot = await response.json();

      if(response.ok) {
        await dispatch(receiveSpot(eachSpot));
        return eachSpot

      }
    };

    export const getAllSpots = () => async (dispatch) => {
        const response = await fetch('/api/spots');
        const spots = await response.json();

        if(response.ok) {
            await dispatch(loadSpots(spots));
            return spots

        }
    }

    export const getOwnerSpots = () => async (dispatch) => {
        const response = await fetch('/api/spots/current')
        const spots = await response.json()
        await dispatch(loadSpots(spots))
        return spots
    }

    export const createSpot = (spot, urls) => async (dispatch) => {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        })
        const aSpot = await response.json()
        // let array = []
        // if(spot.SpotImages) {
        //     spot.SpotImages.forEach(async (eachImage) => {
        //         const response1 = await csrfFetch(`/api/spots/${aSpot.id}/images`, {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(eachImage)
        //         })
        //         //
        //         const eachPhoto = await response1.json()
        //         //
        //         array.push(eachPhoto)
        //     })
        // }

        let array = []

        urls.forEach(async (eachImage) => {
            if(eachImage.url.length > 0) {
                const response1 = await csrfFetch(`/api/spots/${aSpot.id}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eachImage)
                })
                const eachPhoto = await response1.json()
                array.push(eachPhoto)
            }
            })
        if(response.ok) {
            await dispatch(addSpot(aSpot, array))
            await dispatch(getSpot(aSpot.id))
            return aSpot
        }
    }

    export const editSpot = (spot, spotId) => async (dispatch) => {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
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

    export const deleteSpot = (spotId) => async (dispatch) => {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })
        if(response.ok) {
            dispatch(removeSpot(spotId))
            return
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
            newState = {...state, singleSpot: action.spot}
            return newState
        case ADD_SPOT:
            const newSpot = {...state, singleSpot: {...state.singleSpot}, allSpots: {...state.allSpots}}
            newSpot.singleSpot[action.spot.id] = action.spot
            newSpot.allSpots[action.spot.id] = action.spot
            newState = newSpot
            return newState
        case EDIT_SPOT:
            const editSpot = {...state, singleSpot: {...state.singleSpot}, allSpots: {...state.allSpots}}
            editSpot.singleSpot[action.spot.id] = action.spot
            editSpot.allSpots[action.spot.id] = action.spot
            newState = editSpot
            return newState
        case DELETE_SPOT:
            newState = {...state, singleSpot: {...state.singleSpot}, allSpots: {...state.allSpots}}
            delete newState.allSpots[action.spotId]
            return newState
        case 'RESET_STATE':
            return {singleSpot: {}, allSpots: {}};
        default:
            return state
    }
}

export default spotsReducer;
