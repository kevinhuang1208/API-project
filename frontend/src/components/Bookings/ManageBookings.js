import { useSelector, useDispatch } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import DeleteSpotModal from "./DeleteSpot";
import './bookings.css'

const ManageBookings = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)

    const allUserBookings = useSelector(state=>state.bookings)

    const bookings = Object.values(allUserBookings)

    console.log("THIS IS ALL USER BOOKINGS ON PAGE", bookings)
    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 1000)
    // }, [])


    // if(isLoading) {
    //     return <h1>Loading...</h1>
    // }

    return(
        <div className="manageBookingsContainer">
            {bookings ? bookings.map((booking) =>
                <div className="eachBookingContainer">
                    <div className="detailsBookingContainer">
                        <div className="descriptionEachBooking">
                            <div className="nameSpotBooking">{booking.Spot.name}</div>
                            <div className="locationSpotBooking">{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</div>
                            <div className="startDateSpotBooking">Start Date: {booking.startDate}</div>
                            <div className="endDateSpotBooking">End Date: {booking.endDate}</div>
                        </div>
                        <div className="imgEachBooking">
                            <img src={booking.Spot.previewImage} alt="Booking Photo"/>
                        </div>
                    </div>
                    <div className="editAndDeleteBookingContainer">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>

            ) : null}
        </div>
    )

}

export default ManageBookings;
