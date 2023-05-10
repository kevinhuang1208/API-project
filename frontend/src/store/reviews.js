//Type Constraints
export const GET_REVIEWS = 'reviews/GET_REVIEWS'

//Action Creators


export const getReviewsBySpot = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
  });

//Thunks
export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(getReviewsBySpot(reviews));
  };



const reviewsReducer = (state = {spot: {}, user: {}}, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return {...state, spot: action.reviews}
        default:
            return state
    }
}

export default reviewsReducer;
