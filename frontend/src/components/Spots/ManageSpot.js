import { useSelector, useDispatch } from "react-redux"
import { getOwnerSpots } from "../../store/spots"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from "./DeleteSpot";
import './ManageSpot.css'
import Load from "../../Load"

const ManageSpot = () => {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)

    const allSpots = useSelector(state=>state.spots.allSpots)

    const spots = Object.values(allSpots)


    useEffect(() => {
        dispatch(getOwnerSpots()).then(() => setLoaded(true))
    }, [dispatch])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 1000)
    // }, [])


    if (!loaded) {
        return (
          <Load />
        )
      }

    return(
        <div className="big-div">
        {spots.length ? spots.map((spot) =>
            <div className="div-contents-flex">
            <Link className='each-link' to={`/spots/${spot.id}`}>
                <span className='tooltip'>{spot.name}</span>
                <img className='img-spot' src={spot.previewImage} alt='Home'/>
                <div className='spot-description'>
                    <div className='left-side-description'>
                        <div className="cityStateManage">{spot.city}, {spot.state}</div>
                        <div className="priceManage">{spot.price} night</div>
                    </div>
                    <div className='starRatingManage'>⭐{spot.avgRating ? spot.avgRating.toFixed(1) : <>New</>}</div>
                </div>
            </Link>
            <div className='buttons'>
                <button><NavLink className='edit-spot' to={`/spots/${spot.id}/edit`}>Update</NavLink></button>
                <button><OpenModalMenuItem
                    className='delete-button'
                    itemText="Delete"
                    modalComponent={<DeleteSpotModal
                    spot={spot}
                    key={spot.id}
                />}
            /></button>
            </div>
            </div>



        ) :
        <Link to={'/spots/new'}>Create a New Spot!</Link>
        }
        </div>
    )

}

export default ManageSpot;
