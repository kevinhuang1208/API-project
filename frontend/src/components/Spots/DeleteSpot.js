import React, { useState, useEffect } from "react";
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
        <div className="deleteModalDiv">
          <div className="confirmDeleteText">Confirm Delete</div>
          <div className="random-text">Are you sure you want to remove this spot from the listings?</div>
          <div className="yesButtonDeleteSpotDiv">
            <button className="yesButtonDeleteSpot" onClick={handleClick}>Yes (Delete Spot)</button>

          </div>
          <div className="noButtonDeleteSpotDiv">
            <button className="noButtonDeleteSpot" onClick={closeModal}>No (Keep Spot)</button>
          </div>

        </div>
      );
}

export default DeleteSpotModal;
