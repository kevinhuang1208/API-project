import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


const DeleteSpotModal = () => {

    return (
        <>
          <h1>Confirm Delete</h1>
          <>Are you sure you want to remove this spot from the listings?</>
          <button>Yes (Delete Spot)</button>
          <button>No (Keep Spot)</button>
        </>
      );
}

export default DeleteSpotModal;
