import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import PostReviewModal from '../PostReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const SpotById = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot.Reviews)

    console.log('this is spot', spot)

    //if user did NOT post a review yet
    const didNotPostYet = () => {
        let didNotPost = true
        reviews.forEach((review) => {
            if(review.User.id === sessionUser.id) didNotPost = false
        })
        return didNotPost
    }

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



    return (
        <>
            <h2>{spot.name}</h2>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            <img src={spot.SpotImages[0].url ? spot.SpotImages[0].url : 'https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png'} alt='Home Image'/>
            <div className='middle-section-spot-id'>
                <div className='left-side-spot-id'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='right-side-spot-id'>
                    <div className='top-right-side-spot-id'>
                        <div>${spot.price} night</div>
                        <div>⭐{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : <>New</>} • {spot.numReviews} {spot.numReviews > 1 ? <>reviews</> : <>review</>}</div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div>⭐{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : <>New</>} • {spot.numReviews} {spot.numReviews > 1 ? <>reviews</> : <>review</>}</div>
            {/*below is logic for Post Your Review*/}
            {sessionUser && (sessionUser.id !== spot.ownerId) && didNotPostYet(reviews) ? <OpenModalMenuItem
              itemText="Post Your Review"
              modalComponent={<PostReviewModal />}
            /> : null}
            <div className='reviews-spot-id'>
                {reviews.map((review) => {
                    return <>
                    <div>{review.User.firstName}</div>
                    <div>{review.createdAt.slice(5, 7)} {review.createdAt.slice(0, 4)}</div>
                    <div>{review.review}</div>
                    </>
                })}

            </div>
        </>
    )
}

export default SpotById;
