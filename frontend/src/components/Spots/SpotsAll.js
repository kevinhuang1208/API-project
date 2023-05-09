import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react"
import SpotEach from "./SpotEach"
import './SpotsAll.css'


const SpotsAll = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state=>Object.values(state.spots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

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
