import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect, useState } from "react"
import SpotEach from "./SpotEach"
import './SpotsAll.css'
import Load from "../../Load"


const SpotsAll = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const allSpots = useSelector(state=>state.spots.allSpots)
    const spots = Object.values(allSpots)

    useEffect(() => {
        dispatch(getAllSpots()).then(() => setLoaded(true))
        return () => {
            dispatch({ type: 'RESET_STATE' });

        }
    }, [dispatch])

    if (!loaded) {
        return (
          <Load />
        )
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
