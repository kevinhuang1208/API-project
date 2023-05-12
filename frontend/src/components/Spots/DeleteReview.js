import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview, getOwnerSpots } from "../../store/reviews";


const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();


        return dispatch(deleteReview(review.id))
          .then(closeModal)
    };

    //   useEffect(() => {
    //     dispatch(getOwnerSpots())
    // }, [dispatch, spot])

    return (
        <>
          <h1>Confirm Delete</h1>
          <>Are you sure you want to remove this spot from the listings?</>
          <button onClick={handleClick}>Yes (Delete Review)</button>
          <button onClick={closeModal}>No (Keep Review)</button>
        </>
      );
}

export default DeleteReviewModal;
