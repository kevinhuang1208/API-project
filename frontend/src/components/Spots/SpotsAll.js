import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react"
import SpotEach from "./SpotEach"
import './SpotsAll.css'


const SpotsAll = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const allSpots = useSelector(state=>state.spots.allSpots)
    const spots = Object.values(allSpots)

    // console.log('allspots', spots)


    return (
        <section>
            <div className="all-spots-div">
            {spots.map((spot) => (

             <SpotEach
                spot={spot}
                key={spot.id}
             />
             ))}
            </div>
        </section>
    )
}

export default SpotsAll
