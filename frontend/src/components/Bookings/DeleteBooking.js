import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/bookings";
import '../Spots/DeleteReview.css'


const DeleteBooking = ({booking}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();


        return dispatch(deleteBookingThunk(booking.id))
          .then(closeModal)
    };

    //   useEffect(() => {
    //     dispatch(getOwnerSpots())
    // }, [dispatch, spot])

    return (
        <>
          <h1>Confirm Delete</h1>
          <div className="random-text">Are you sure you want to remove this booking?</div>
          <div className="delete-review-two-buttons">
          <button onClick={handleClick}>Yes (Delete Booking)</button>
          <button onClick={closeModal}>No (Keep Booking)</button>
          </div>
        </>
      );
}

export default DeleteBooking;
