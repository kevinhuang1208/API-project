
//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOTS'

//Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });


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
        default:
            return state
    }
}

export default spotsReducer;
