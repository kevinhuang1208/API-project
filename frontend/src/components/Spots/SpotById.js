import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { deleteReview, getReviews } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './SpotById.css'

const SpotById = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spots.singleSpot)

    const theReviews = useSelector(state => state.reviews.spot)
    const losReviews = Object.values(theReviews)
    const reviews = Object.values(theReviews)
    console.log('this is losReviews', losReviews)
    console.log('this is reviews', reviews)


    // console.log(spot)
    // console.log('review length?', reviews.length)
    // console.log('this is spot', spot)

    //if user did NOT post a review yet
    const didNotPostYet = () => {
        let didNotPost = true
        reviews.forEach((review) => {
            if(review.User.id === sessionUser.id) didNotPost = false
        })
        return didNotPost
    }

    const handleClick = (e) => {
        e.preventDefault();


        return alert("Feature coming soon")
    };

    // const handleDeleteClick = (e) => {
    //     e.preventDefault();


    //     return dispatch(deleteReview(spot.id))
    // };

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])


    if(!spot) return null
    if(Object.values(spot).length === 0) {
        return null;
      }

    if(!reviews) return null
    // if(Object.values(reviews).length === 0) {
    //       return null;
    //     }
    // if(!spot.SpotImages) return null;


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
                        <div>⭐{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : <>New</>} {!reviews.length ? null : reviews && (reviews.length = 1) ? <>• {reviews.length} review</> : <>• {reviews.length} reviews</>}</div>
                    </div>
                    <button onClick={handleClick}>Reserve</button>
                </div>
            </div>
            <div>⭐{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : <>New</>} {!reviews.length ? null : reviews && (reviews.length = 1) ? <>• {reviews.length} review</> : <>• {reviews.length} reviews</>}</div>
            {/*• {spot.numReviews} {spot.numReviews > 1 ? <>reviews</> : <>review</>}*/}
            {/*below is logic for Post Your Review*/}
            {sessionUser && (sessionUser.id !== spot.ownerId) && didNotPostYet(reviews) ? <OpenModalMenuItem
              itemText="Post Your Review"
              modalComponent={<PostReviewModal spot={spot} key={spot.id}/>}
            /> : null}
            <div className='reviews-spot-id'>
                {reviews.map((review) => {
                     const handleDeleteClick = (e) => {
                        e.preventDefault();


                        return dispatch(deleteReview(review.id))
                    };
                    return <>
                    <div>{review.User.firstName}</div>
                    <div>{review.createdAt.slice(5, 7)} {review.createdAt.slice(0, 4)}</div>
                    <div>{review.review}</div>
                    {sessionUser && (sessionUser.id === review.userId) ? <button onClick={handleDeleteClick}>Delete</button> : null}
                    </>
                })}

            </div>
        </>
    )
}

export default SpotById;
