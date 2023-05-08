import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const SpotEach = ({spot}) => {
    console.log('this is from spoteach', spot)
    return (
        <div className="div-contents-flex">
        <Link to={`/spots/${spot.id}`}>
            <div className='img-spot'>
                {spot.previewImage}
            </div>
            <div className='spot-description'>
                <div className='left-side-description'>
                    <div>{spot.city}, {spot.state}</div>
                    <div>{spot.price}/night</div>
                </div>
                <div className='right-side-description'>⭐{spot.avgRating}</div>
            </div>
        </Link>


      </div>
    )
}

export default SpotEach;
