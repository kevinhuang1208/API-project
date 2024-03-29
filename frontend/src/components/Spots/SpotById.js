import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from './DeleteReview';
import './SpotById.css'
import CreateBooking from '../Bookings/CreateBooking';
import Load from "../../Load"

const SpotById = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    let spot = useSelector(state => state.spots.singleSpot)

    const theReviews = useSelector(state => state.reviews.spot)

    const reviewsReversed = Object.values(theReviews).reverse()

    useEffect(() => {
        if (spotId) {
            dispatch(getSpot(spotId)).then(() => setLoaded(true))
            dispatch(getReviews(spotId))
        }

        return () => {
            dispatch({ type: 'RESET_STATE' });
        }
    },[dispatch])

    //if user did NOT post a review yet
    const didNotPostYet = () => {
        let didNotPost = true
        Object.values(theReviews).forEach((review) => {
            if(review.User.id === sessionUser.id) didNotPost = false
        })
        return didNotPost
    }

    const convertToMonth = (numString) => {
        if(numString === "01") return "January"
        if(numString === "02") return "February"
        if(numString === "03") return "March"
        if(numString === "04") return "April"
        if(numString === "05") return "May"
        if(numString === "06") return "June"
        if(numString === "07") return "July"
        if(numString === "08") return "August"
        if(numString === "09") return "September"
        if(numString === "10") return "October"
        if(numString === "11") return "November"
        if(numString === "12") return "December"
    }

    if (!loaded && !spot.SpotImages) {
        return (
          <Load />
        )
      }

    // if(!spot) return null
    if(Object.values(spot).length === 0) {
        return null;
      }

    if(!Object.values(theReviews)) return null

    return (

        <>

            <h2>{spot.name}</h2>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            <div className='grid'>
            <img className='main' src={spot.SpotImages && spot.SpotImages[0]?.url.length ? spot.SpotImages[0].url : 'https://cdn.discordapp.com/attachments/1117948168353628201/1129506444752994384/gray-sofa-white-living-room-interior-with-copy-space-3d-rendering.jpg'}/>
            <img className='photoone' src={spot.SpotImages && spot.SpotImages[1]?.url.length ? spot.SpotImages[1].url : 'https://cdn.discordapp.com/attachments/1117948168353628201/1129506444752994384/gray-sofa-white-living-room-interior-with-copy-space-3d-rendering.jpg'}/>
            <img className='phototwo' src={spot.SpotImages && spot.SpotImages[2]?.url.length ? spot.SpotImages[2].url : 'https://cdn.discordapp.com/attachments/1117948168353628201/1129506444752994384/gray-sofa-white-living-room-interior-with-copy-space-3d-rendering.jpg'}/>
            <img className='photothree' src={spot.SpotImages && spot.SpotImages[3]?.url.length ? spot.SpotImages[3].url : 'https://cdn.discordapp.com/attachments/1117948168353628201/1129506444752994384/gray-sofa-white-living-room-interior-with-copy-space-3d-rendering.jpg'}/>
            <img className='photofour' src={spot.SpotImages && spot.SpotImages[4]?.url.length ? spot.SpotImages[4].url : 'https://cdn.discordapp.com/attachments/1117948168353628201/1129506444752994384/gray-sofa-white-living-room-interior-with-copy-space-3d-rendering.jpg'}/>
            </div>
            <div className='middle-section-spot-id'>
                <div className='left-side-spot-id'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='right-side-spot-id'>
                    <div className='top-right-side-spot-id'>
                        <div>${spot.price} night</div>
                        <div>⭐{Object.values(theReviews).length > 0 ? (Object.values(theReviews).reduce((acc, review) => acc + review.stars, 0) / Object.values(theReviews).length).toFixed(1) : <>New</>} {!Object.values(theReviews).length ? null : Object.values(theReviews) && (Object.values(theReviews).length === 1) ? <>• {Object.values(theReviews).length} review</> : <>• {Object.values(theReviews).length} reviews</>}</div>
                    </div>
                    <div className='reserve-button'>
                    {sessionUser ?
                    <OpenModalMenuItem
                        className='make-reserve-button'
                        itemText="Reserve"
                        modalComponent={<CreateBooking spot={spot} key={spot.id}/>}
                    />
                    : <div className='noUserReserve'>Please log in to Make A Booking</div> }
                    </div>
                </div>
            </div>
            <div className='second-star'>
                ⭐{Object.values(theReviews).length > 0 ? (Object.values(theReviews).reduce((acc, review) => acc + review.stars, 0) / Object.values(theReviews).length).toFixed(1) : <>New</>} {!Object.values(theReviews).length ? null : Object.values(theReviews) && (Object.values(theReviews).length === 1) ? <>• {Object.values(theReviews).length} review</> : <>• {Object.values(theReviews).length} reviews</>}
            </div>

            <div className='make-review'>
            {sessionUser && Object.values(theReviews).length > 0 && (sessionUser.id !== spot.ownerId) && didNotPostYet(Object.values(theReviews)) ? <OpenModalMenuItem
              className='make-review-button'
              itemText="Post Your Review"
              modalComponent={<PostReviewModal spot={spot} key={spot.id}/>}
            /> :
            sessionUser && Object.values(theReviews).length < 1 && (sessionUser.id !== spot.ownerId) && didNotPostYet(Object.values(theReviews)) ? <OpenModalMenuItem
              className='make-review-button'
              itemText="Be the first to post a review!"
              modalComponent={<PostReviewModal spot={spot} key={spot.id}/>}
            /> :
            null}
            </div>

            <div className='reviews-spot-id'>
                {reviewsReversed.map((review) => {
                    return <>
                    <div className='name-review'>{review.User.firstName}</div>
                    <div>{convertToMonth(review.createdAt.slice(5, 7))} {review.createdAt.slice(0, 4)}</div>
                    <div className='review-review'>{review.review}</div>
                    {sessionUser && (sessionUser.id === review.userId) ?
                    <button>
                        <OpenModalMenuItem
                            className='delete-button'
                            itemText="Delete"
                            modalComponent={<DeleteReviewModal review={review} key={review.id}
                            />}
                    />
                    </button> : null}
                    </>
                })}

            </div>

        </>
    )
}

export default SpotById;
