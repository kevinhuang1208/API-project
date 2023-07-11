import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
// import { addImage, changeSpot, createSpot, editSpot } from '../../store/spots';
import { createBookingThunk, editBookingThunk } from '../../store/bookings';
import { useModal } from "../../context/Modal";
// import './SpotForm.css'

const BookingForm = ({ formType, spot, booking }) => {
    const history = useHistory();
    const { closeModal } = useModal();
    // const {spotId} = useParams()

    // const theSpot = useSelector(state=>state.spots.allSpots[spotId])

    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // console.log("start dates", startDate)
    // console.log("end dates", endDate)
    // console.log("THIS IS SPOT ID", spot.id)

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log("THESE ARE THE VALIDATIONS", validationErrors)
    console.log("THIS IS THE BOOKING ID?", booking)


    useEffect(() => {
      setValidationErrors([]);
    }, [dateRange])


    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
      e.preventDefault();
      // setValidationErrors([]);
      setHasSubmitted(true);
      // setValidationErrors([]);
    //   if (validationErrors.length) return alert(`Cannot Submit`);


      if(formType==="Create Booking") {
        const newBooking = {
            startDate,
            endDate
        }


      try {
        await dispatch(createBookingThunk(newBooking, spot.id))

      } catch (error) {
        validationErrors.push(error)
      }

      setHasSubmitted(false);
      if(!validationErrors.length) {
        history.push('/bookings/current')
        closeModal()
      }
    }

      if(formType==="Edit Booking") {
       const changeBooking = {
           startDate,
           endDate
       }


        try {
          await dispatch(editBookingThunk(changeBooking, booking.id))

        } catch (error) {
          validationErrors.push(error)
        }

        setHasSubmitted(false);
        if(!validationErrors.length) {
          // history.push('/bookings/current')
          closeModal()
        }
      }

    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        {validationErrors.length ? <>These dates have already been booked! Please choose another date range.</> : null}
        <div>
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText='Please select a date range'
        />
        </div>

        <div className='submit-form'>
        <button type="submit">{formType}</button>
        </div>

      </form>
    );
  };


  export default BookingForm;
