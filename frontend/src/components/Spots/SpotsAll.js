import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect, useState } from "react"
import SpotEach from "./SpotEach"
import './SpotsAll.css'


const SpotsAll = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const allSpots = useSelector(state=>state.spots.allSpots)
    const spots = Object.values(allSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])


    if(isLoading) {
        return <h1>Loading...</h1>
    }


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
