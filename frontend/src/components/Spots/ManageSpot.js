import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const ManageSpot = () => {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const allSpots = useSelector(state=>state.spots.allSpots)

    const spots = Object.values(allSpots)


    const ownSpots = spots.filter((spot) => spot.ownerId === sessionUser.id)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    console.log('this is a spot', ownSpots)

    return(
        <>
        {ownSpots.map((spot) => {
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
        })}
        </>
    )

}

export default ManageSpot;
