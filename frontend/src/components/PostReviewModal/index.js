import React, { useState } from "react";
import * as sessionActions from "../../store/session";
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
      <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave your review here..."
            />
          {/*trial and error starts here*/}
          <div className="rating-input">
      <div
        className={rating >= 1 ? "filled" : "empty"}
        // onMouseEnter={() => { if (!disabled) setRating(1)} }
        // onMouseLeave={() => { if (!disabled) setRating(rating)} }
        onClick={() => { if (!disabled) onChange(1)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 2 ? "filled" : "empty"}
        // onMouseEnter={() => { if (!disabled) setRating(2)} }
        // onMouseLeave={() => { if (!disabled) setRating(rating)} }
        onClick={() => { if (!disabled) onChange(2)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 3 ? "filled" : "empty"}
        // onMouseEnter={() => { if (!disabled) setRating(3)} }
        // onMouseLeave={() => { if (!disabled) setRating(rating)} }
        onClick={() => { if (!disabled) onChange(3)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 4 ? "filled" : "empty"}
        // onMouseEnter={() => { if (!disabled) setRating(4)} }
        // onMouseLeave={() => { if (!disabled) setRating(rating)} }
        onClick={() => { if (!disabled) onChange(4)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={rating >= 5 ? "filled" : "empty"}
        // onMouseEnter={() => { if (!disabled) setRating(5) }}
        // onMouseLeave={() => { if (!disabled) setRating(rating)} }
        onClick={() => { if (!disabled) onChange(5)} }
      >
        <i className="fa fa-star"></i>
      </div>
        <span>Stars</span>
    </div>
          {/*trial and error ends here*/}
          <button type="submit" disabled={!rating || review.length < 10 ? true : false}>Submit Your Review</button>
        </form>
      </>
    );
  }

  export default PostReviewModal;
