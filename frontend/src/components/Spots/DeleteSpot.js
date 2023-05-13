import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot, getOwnerSpots } from "../../store/spots";
import "./DeleteSpot.css"


const DeleteSpotModal = ({spot}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();


        return dispatch(deleteSpot(spot.id))
          .then(closeModal)
    };

      useEffect(() => {
        dispatch(getOwnerSpots())
    }, [dispatch, spot])

    return (
        <>
          <h1>Confirm Delete</h1>
          <div className="random-text">Are you sure you want to remove this spot from the listings?</div>
          <div className="delete-two-buttons">
            <button onClick={handleClick}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
          </div>
        </>
      );
}

export default DeleteSpotModal;
