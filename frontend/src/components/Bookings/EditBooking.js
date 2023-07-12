import BookingForm from "./BookingForm";

const EditBooking = ({booking}) => {

    return(
        <BookingForm
            formType="Edit Booking" booking={booking}
        />
    )

}

export default EditBooking;
