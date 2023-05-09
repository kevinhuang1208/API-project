import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpot } from '../../store/spots';

const SpotById = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch, spotId])

    if(!spot) return null
    if(Object.values(spot).length === 0) {
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
                        <div>⭐{spot.avgStarRating.toFixed(1)} • {spot.numReviews} review(s)</div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='reviews-spot-id'>

            </div>
        </>
    )
}

export default SpotById;
