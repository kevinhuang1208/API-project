import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';

const SpotById = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.spots.reviews)
    console.log('this is reviews', reviews)

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch, spotId])


    if(!spot) return null
    if(Object.values(spot).length === 0) {
        return null;
      }

    if(!reviews) return null
    if(Object.values(reviews).length === 0) {
          return null;
        }



    return (
        <>
            <h2>{spot.name}</h2>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            <img src={spot.SpotImages[0].url} alt='Home Image'/>
            <div className='middle-section-spot-id'>
                <div className='left-side-spot-id'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='right-side-spot-id'>
                    <div className='top-right-side-spot-id'>
                        <div>${spot.price} night</div>
                        <div>⭐{spot.avgStarRating} • {spot.numReviews} review(s)</div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='reviews-spot-id'>
                {/* {reviews.forEach((review) => {
                    <div>
                    {console.log('this is inside the foreach', review)}
                    <>{review.User.firstName}</>
                    <>{review.createdAt.slice(5, 7)}</>
                    </div>
                })} */}
            </div>
        </>
    )
}

export default SpotById;
