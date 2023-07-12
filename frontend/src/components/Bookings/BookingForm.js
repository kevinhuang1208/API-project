import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { createBookingThunk, editBookingThunk } from '../../store/bookings';
import { useModal } from "../../context/Modal";

const BookingForm = ({ formType, spot, booking }) => {
    const history = useHistory();
    const { closeModal } = useModal();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
      setValidationErrors([]);
    }, [dateRange])

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();

      setHasSubmitted(true);

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
          closeModal()
        }
      }

    };

    return (
      <form id='bookingForm' onSubmit={handleSubmit}>
        <div className='titleAndDatePickerDiv'>
        <h2>{formType}</h2>
        {validationErrors.length ? <div className='validationsBookingForm'>These dates have already been booked! Please choose another date range.</div> : null}
        <div className='datePickerDiv'>
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
        </div>
        <div className='submit-form'>
        <button type="submit">{formType}</button>
        </div>

      </form>
    );
  };


  export default BookingForm;
