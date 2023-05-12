import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { deleteReview, getReviews } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from './DeleteReview';
import './SpotById.css'

const SpotById = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spots.singleSpot)

    const theReviews = useSelector(state => state.reviews.spot)

    const reviewsReversed = Object.values(theReviews).reverse()

    // console.log('this is the reviews', theReviews)

    // console.log('this is spot', spot)
    // console.log('this is reviews', Object.values(theReviews))


    //if user did NOT post a review yet
    const didNotPostYet = () => {
        let didNotPost = true
        Object.values(theReviews).forEach((review) => {
            if(review.User.id === sessionUser.id) didNotPost = false
        })
        return didNotPost
    }

    const handleClick = (e) => {
        e.preventDefault();


        return alert("Feature coming soon")
    };

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

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])


    // if(!spot) return null
    if(Object.values(spot).length === 0) {
        return null;
      }


    if(!Object.values(theReviews)) return null
    // if(Object.values(reviews).length === 0) {
    //       return null;
    //     }


    return (
        <>
            <h2>{spot.name}</h2>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            <div className='grid'>
            <img className='main' src={spot.SpotImages[0] ? spot.SpotImages[0].url : 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'} alt='Home Image'/>
            <img className='photoone' src={spot.SpotImages[1] ? spot.SpotImages[1].url : 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'} alt='Photo'/>
            <img className='phototwo' src={spot.SpotImages[2] ? spot.SpotImages[2].url : 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'} alt='Photo'/>
            <img className='photothree' src={spot.SpotImages[3] ? spot.SpotImages[3].url : 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'} alt='Photo'/>
            <img className='photofour' src={spot.SpotImages[4] ? spot.SpotImages[4].url : 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'} alt='Photo'/>
            </div>
            <div className='middle-section-spot-id'>
                <div className='left-side-spot-id'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='right-side-spot-id'>
                    <div className='top-right-side-spot-id'>
                        <div>${spot.price} night</div>
                        <div>⭐{Object.values(theReviews) ? (Object.values(theReviews).reduce((acc, review) => acc + review.stars, 0) / Object.values(theReviews).length).toFixed(1) : <>New</>} {!Object.values(theReviews).length ? null : Object.values(theReviews) && (Object.values(theReviews).length === 1) ? <>• {Object.values(theReviews).length} review</> : <>• {Object.values(theReviews).length} reviews</>}</div>
                    </div>
                    <button onClick={handleClick}>Reserve</button>
                </div>
            </div>
            <div>⭐{Object.values(theReviews) ? (Object.values(theReviews).reduce((acc, review) => acc + review.stars, 0) / Object.values(theReviews).length).toFixed(1) : <>New</>} {!Object.values(theReviews).length ? null : Object.values(theReviews) && (Object.values(theReviews).length === 1) ? <>• {Object.values(theReviews).length} review</> : <>• {Object.values(theReviews).length} reviews</>}</div>
            {/*spot.avgStarRating ? spot.avgStarRating.toFixed(1)*/}
            {/*• {spot.numReviews} {spot.numReviews > 1 ? <>reviews</> : <>review</>}*/}
            {/*below is logic for Post Your Review*/}
            {sessionUser && Object.values(theReviews).length > 0 && (sessionUser.id !== spot.ownerId) && didNotPostYet(Object.values(theReviews)) ? <OpenModalMenuItem
              itemText="Post Your Review"
              modalComponent={<PostReviewModal spot={spot} key={spot.id}/>}
            /> :
            sessionUser && Object.values(theReviews).length < 1 && (sessionUser.id !== spot.ownerId) && didNotPostYet(Object.values(theReviews)) ? <OpenModalMenuItem
              itemText="Be the first to post a review!"
              modalComponent={<PostReviewModal spot={spot} key={spot.id}/>}
            /> :
            null}
            <div className='reviews-spot-id'>
                {reviewsReversed.map((review) => {
                    return <>
                    <div>{review.User.firstName}</div>
                    <div>{convertToMonth(review.createdAt.slice(5, 7))} {review.createdAt.slice(0, 4)}</div>
                    <div>{review.review}</div>
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
