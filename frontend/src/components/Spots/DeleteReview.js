import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";
import './DeleteReview.css'


const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();


        return dispatch(deleteReview(review.id))
          .then(closeModal)
    };

    return (
      <div className="deleteReviewModalDiv">
      <div className="confirmReviewDeleteText">Confirm Delete</div>
      <div className="random-text">Are you sure you want to remove this review?</div>
      <div className="yesButtonDeleteReviewDiv">
        <button className="yesButtonDeleteReview" onClick={handleClick}>Yes (Delete Review)</button>

      </div>
      <div className="noButtonDeleteReviewDiv">
        <button className="noButtonDeleteReview" onClick={closeModal}>No (Keep Review)</button>
      </div>

    </div>
      );
}

export default DeleteReviewModal;
