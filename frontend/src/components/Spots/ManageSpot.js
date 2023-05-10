import { useSelector, useDispatch } from "react-redux"
import { getOwnerSpots } from "../../store/spots"
import { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import './ManageSpot.css'

const ManageSpot = () => {

    const dispatch = useDispatch()

    const allSpots = useSelector(state=>state.spots.allSpots)

    const spots = Object.values(allSpots)


    useEffect(() => {
        dispatch(getOwnerSpots())
    }, [dispatch])


    console.log('this is a spot', spots)

    return(
        <div className="big-div">
        {spots.length ? spots.map((spot) =>
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
            <div className='buttons'>
                <button><NavLink className='edit-spot' to={`/spots/${spot.id}/edit`}>Update</NavLink></button>
                <button>Delete</button>
            </div>
            </div>



        ) :
        <Link to={'/spots/new'}>Create a New Spot!</Link>
        }
        </div>
    )

}

export default ManageSpot;
