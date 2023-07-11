import { csrfFetch } from "./csrf";

//Type Constraints
export const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
export const ADD_BOOKING = 'bookings/ADD_BOOKING'
export const EDIT_BOOKING = 'bookings/EDIT_BOOKING'
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

// //Action Creators


// export const getReviewsBySpot = (reviews) => ({
//     type: GET_REVIEWS,
//     reviews,
//   });

export const getUserBookings = (bookings) => ({
    type: GET_USER_BOOKINGS,
    bookings
});

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
})

export const editBooking = (booking) => ({
  type: EDIT_BOOKING,
  booking
})

export const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
})

// //Thunks
// export const getReviews = (spotId) => async (dispatch) => {
//     const response = await fetch(`/api/spots/${spotId}/reviews`);
//     const reviews = await response.json();
//     dispatch(getReviewsBySpot(reviews));
//   };

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await fetch('/api/bookings/current')
        const bookings = await response.json()
        await dispatch(getUserBookings(bookings))
        return bookings
}

export const createBookingThunk = (booking, spotId) => async (dispatch) => {
  const req = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  })
  const createdBooking = await req.json()
  await dispatch(addBooking(createdBooking))
  return createdBooking

}

export const editBookingThunk = (booking, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(booking)
  })
  if(response.ok) {
      const edittedBooking = await response.json()
      await dispatch(editBooking(edittedBooking))
      await dispatch(getUserBookingsThunk())
      return edittedBooking
  }
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    await dispatch(deleteBooking(bookingId))
    return
  }
}

//state = {spot: {}, user: {}
const initialState = {}

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_BOOKINGS:
          newState = {...state}
          const someBookings = {}
          action.bookings.Bookings.map((booking) => {
            someBookings[booking.id] = booking
          })
          newState = someBookings
          return newState
        case ADD_BOOKING:
          const newBooking = {...state}
          newBooking[action.booking.id] = action.booking
          newState = newBooking
          return newState
        case EDIT_BOOKING:
          const editBooking = {...state}
          editBooking[action.booking.id] = action.booking
          newState = editBooking
          return newState
        case DELETE_BOOKING:
          newState = {...state}
          delete newState[action.bookingId]
          return newState
       default:
            return state
    }

}

export default bookingsReducer;
