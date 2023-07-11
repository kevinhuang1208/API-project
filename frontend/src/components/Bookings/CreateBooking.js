import BookingForm from "./BookingForm";

const CreateBooking = ({spot}) => {

    return(
        <BookingForm
            formType="Create Booking" spot={spot}
        />
    )

}

export default CreateBooking;
