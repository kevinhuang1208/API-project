//Type Constraints
// export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
// export const RECEIVE_SPOT = 'spots/RECEIVE_SPOTS'

//Action Creators
// export const loadSpots = (spots) => ({
//     type: LOAD_SPOTS,
//     spots,
// })

// export const receiveSpot = (spot) => ({
//     type: RECEIVE_SPOT,
//     spot,
//   });

//Thunks
// export const getSpot = (spotId) => async (dispatch) => {
//     const response = await fetch(`/api/spots/${spotId}`);
//     const eachSpot = await response.json();
//     dispatch(receiveSpot(eachSpot));
//   };

// export const getAllSpots = () => async (dispatch) => {
//     const response = await fetch('/api/spots');
//     const spots = await response.json();
//     dispatch(loadSpots(spots));
// }

const reviewsReducer = (state = {spot: {}, user: {}}, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default reviewsReducer;
