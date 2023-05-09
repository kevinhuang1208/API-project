
//Type Constraints
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOTS'
export const RECEIVE_REVIEWS = 'spots/RECEIVE_REVIEWS'

//Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });


//potential
export const receiveReviews = (spot) => ({
    type: RECEIVE_REVIEWS,
    spot
})

//Thunks
export const getSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    const response1 = await fetch(`/api/spots/${spotId}/reviews`)
    const eachSpot = await response.json();
    const reviews = await response1.json();
    dispatch(receiveSpot(eachSpot));
    dispatch(receiveReviews(reviews))
  };

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    console.log(spots)
    dispatch(loadSpots(spots));
}

// export const getAllSpotReviews = (spotId) => async (dispatch) => {
//     const response = await fetch(`/api/spots/${spotId}/reviews`);
//     const reviews = await response.json();
//     console.log('did we get all the reviews', reviews)
//     dispatch(receiveReviews(reviews));
// }


const spotsReducer = (state = {singleSpot: {}, reviews: {}}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.Spots.map((spot) => {
                spotsState[spot.id] = spot;
            })
            return spotsState
        case RECEIVE_SPOT:
            return {...state, singleSpot: action.spot, reviews: action.spot}
        default:
            return state
    }
}

export default spotsReducer;
