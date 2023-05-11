import { Link } from 'react-router-dom';
import "./SpotsAll.css"
// import { useDispatch } from 'react-redux';

const SpotEach = ({spot}) => {

    if(!spot.avgRating) return null
    console.log('why isnt it updating', spot)

    return (
        <div className="div-contents-flex">
        <Link className='each-link' to={`/spots/${spot.id}`}>
            <span className='tooltip'>{spot.name}</span>
            <img className='img-spot' src={spot.previewImage} alt='Home'/>
            <div className='spot-description'>
                <div className='left-side-description'>
                    <div>{spot.city}, {spot.state}</div>
                    <div>{spot.price} night</div>
                </div>
                <div className='right-side-description'>⭐{spot.avgRating ? spot.avgRating.toFixed(1) : <>New</>}</div>
            </div>
        </Link>


      </div>
    )
}

export default SpotEach;
