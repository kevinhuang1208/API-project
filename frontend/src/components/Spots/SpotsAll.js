import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react"
import SpotEach from "./SpotEach"
import './SpotsAll.css'


const SpotsAll = () => {
    const dispatch = useDispatch()


    const allSpots = useSelector(state=>state.spots.allSpots)
    const spots = Object.values(allSpots)

    console.log('allspots', spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <section>
            <div className="all-spots-div">
            {spots.map((spot) => (
                <>
                {console.log('inside the map', spot)}
             <SpotEach
                spot={spot}
                key={spot.id}
             />
             </>
             ))}
            </div>
        </section>
    )
}

export default SpotsAll
