import { Link } from 'react-router-dom';
import "./SpotsAll.css"
// import { useDispatch } from 'react-redux';

const SpotEach = ({spot}) => {

    return (
        <div className="div-contents-flex">
        <Link to={`/spots/${spot.id}`}>
            <img className='img-spot' src={spot.previewImage} alt='Home'/>
            <div className='spot-description'>
                <div className='left-side-description'>
                    <div>{spot.city}, {spot.state}</div>
                    <div>{spot.price}/night</div>
                </div>
                <div className='right-side-description'>⭐{spot.avgRating.toFixed(1)}</div>
            </div>
        </Link>


      </div>
    )
}

export default SpotEach;
