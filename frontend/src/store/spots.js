//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';

//Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
})

//Thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    dispatch(loadSpots(spots));
}


const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.Spots.map((spot) => {
                spotsState[spot.id] = spot;
            })
            return spotsState
        default:
            return state
    }
}

export default spotsReducer;
