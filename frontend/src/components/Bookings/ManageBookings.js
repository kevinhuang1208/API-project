import { useSelector, useDispatch } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditBooking from "./EditBooking"
import DeleteBooking from "./DeleteBooking";
import Load from "../../Load";
// import DeleteSpotModal from "./DeleteSpot";
import './bookings.css'

const ManageBookings = () => {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)

    const allUserBookings = useSelector(state=>state.bookings)

    const bookings = Object.values(allUserBookings)

    console.log("THIS IS ALL USER BOOKINGS ON PAGE", bookings)
    useEffect(() => {
        dispatch(getUserBookingsThunk()).then(() => setLoaded(true))
    }, [])

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
        <div className="manageBookingsContainer">
            {bookings ? bookings.map((booking) =>
                <div className="eachBookingContainer">
                    <div className="detailsBookingContainer">
                        <div className="descriptionEachBooking">
                            <div className="nameSpotBooking">{booking.Spot ? booking.Spot.name : <>...</>}</div>
                            <div className="locationSpotBooking">{booking.Spot ? booking.Spot.address : <>...</>}, {booking.Spot ? booking.Spot.city : <>...</>}, {booking.Spot ? booking.Spot.state : <>...</>}, {booking.Spot ? booking.Spot.country : <>...</>}</div>
                            <div className="startDateSpotBooking">Start Date: {booking ? booking.startDate : <>...</>}</div>
                            <div className="endDateSpotBooking">End Date: {booking ? booking.endDate : <>...</>}</div>
                        </div>
                        <div className="imgEachBooking">
                            <Link className='linkToSpotId' to={`/spots/${booking.spotId}`}>
                                <img src={booking.Spot ? booking.Spot.previewImage : <>Loading image...</>}/>
                            </Link>
                        </div>
                    </div>
                    <div className="editAndDeleteBookingContainer">
                        <div className="editBookingButtonDiv">
                            <OpenModalMenuItem
                            className='editBookingActualButton'
                            itemText="Edit Booking"
                            modalComponent={<EditBooking booking={booking} key={booking.id}/>}
                            />
                        </div>
                        <div className="deleteBookingButtonDiv">
                            <OpenModalMenuItem
                            className='deleteBookingActualButton'
                            itemText="Delete Booking"
                            modalComponent={<DeleteBooking booking={booking} key={booking.id}/>}
                            />
                        </div>
                    </div>
                </div>

            ) : null}
        </div>
    )

}

export default ManageBookings;
