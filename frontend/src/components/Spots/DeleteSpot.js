import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot, getOwnerSpots } from "../../store/spots";


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
          <>Are you sure you want to remove this spot from the listings?</>
          <button onClick={handleClick}>Yes (Delete Spot)</button>
          <button>No (Keep Spot)</button>
        </>
      );
}

export default DeleteSpotModal;
