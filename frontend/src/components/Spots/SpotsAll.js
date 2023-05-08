import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react"
import SpotEach from "./SpotEach"


const SpotsAll = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state=>Object.values(state.spots))

    console.log('this from spotsall', spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <section>
            <div>
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
