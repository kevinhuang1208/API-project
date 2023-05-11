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
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
          newState = {...state}
          const someReviews = {}
          // console.log('from review reducer', action.reviews.Reviews)
          action.reviews.Reviews.map((review) => {
            someReviews[review.id] = review
          })
          newState.spot = someReviews
          // console.log('newState from review reducer', newState)
          return newState
        default:
            return state
    }
}

export default reviewsReducer;
