import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReview.css";
import { createReview } from "../../store/reviews";


function PostReviewModal({spot}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const { closeModal } = useModal();


    const onChange = (number) => {
      setRating(number);
    };


    let disabled = false

    const handleSubmit = async (e) => {
      e.preventDefault();

      const newReview = {
        review,
        stars: rating

      }

      await dispatch(createReview(newReview, spot.id))
        .then(closeModal)


    }

    return (
      <div className="reviewFormDiv">
        <div className="reviewFormText">How was your stay?</div>
        <form id="reviewForm" onSubmit={handleSubmit}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave your review here..."
            />
          <div className="rating-input">
      <div
        className={rating >= 1 ? "filled" : "empty"}
        onClick={() => { if (!disabled) onChange(1)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 2 ? "filled" : "empty"}
        onClick={() => { if (!disabled) onChange(2)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 3 ? "filled" : "empty"}
        onClick={() => { if (!disabled) onChange(3)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 4 ? "filled" : "empty"}
        onClick={() => { if (!disabled) onChange(4)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 5 ? "filled" : "empty"}
        onClick={() => { if (!disabled) onChange(5)} }
      >
        <i className="fa fa-star"></i>
      </div>
        <span>Stars</span>
    </div>
          <div className="submit-review-button">
          <button type="submit" disabled={!rating || review.length < 10 ? true : false}>Submit Your Review</button>
          </div>
        </form>
      </div>
    );
  }

  export default PostReviewModal;
