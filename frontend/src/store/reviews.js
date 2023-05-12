import { csrfFetch } from "./csrf";

//Type Constraints
export const GET_REVIEWS = 'reviews/GET_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

//Action Creators


export const getReviewsBySpot = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
  });

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

export const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
})

//Thunks
export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(getReviewsBySpot(reviews));
  };

export const createReview = (review, spotId) => async (dispatch) => {
  const req = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })
  const createdReview = await req.json()
  dispatch(addReview(createdReview))
  return createdReview

}

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispatch(removeReview(reviewId))
    return
  }
}



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
        case ADD_REVIEW:
          const newReview = {...state, spot: {...state.spot}, user: {...state.user}}
          newReview.spot[action.review.id] = action.review
          newState = newReview
          return newState
        case DELETE_REVIEW:
          newState = {...state, spot: {...state.spot}, user: {...state.user}}
          delete newState.spot[action.reviewId]
          return newState
        default:
            return state
    }
}

export default reviewsReducer;
