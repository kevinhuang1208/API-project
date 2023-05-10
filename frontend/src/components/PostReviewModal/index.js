import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReview.css";


function PostReviewModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const { closeModal } = useModal();



    const handleSubmit = (e) => {
      e.preventDefault();
    //   setErrors({});
    //   return dispatch(sessionActions.login({ credential, password }))
    //     .then(closeModal)
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) {
    //         setErrors(data.errors);
    //       }
    //     });
    };

    // const handleDemoSubmit = (e) => {
    //   e.preventDefault();
    //   return dispatch(sessionActions.demoLogin("Demo-lition", "password"))
    //     .then(closeModal)
    // };

    return (
      <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave your review here..."
            />

          <button type="submit">Submit Your Review</button>
        </form>
      </>
    );
  }

  export default PostReviewModal;
