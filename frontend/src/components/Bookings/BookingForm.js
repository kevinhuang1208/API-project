import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-date-picker'
import 'react-datepicker/dist/react-datepicker.css'
// import { addImage, changeSpot, createSpot, editSpot } from '../../store/spots';
// import './SpotForm.css'

const BookingForm = ({ formType }) => {
    const history = useHistory();

    const {spotId} = useParams()

    // const theSpot = useSelector(state=>state.spots.allSpots[spotId])

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // useEffect(() => {
    //     let errors = [];
    //     if (!country.length) errors.push("Country is required");
    //     if (!address.length) errors.push("Address is required");
    //     setValidationErrors(errors);
    // }, [country, address])

    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
      e.preventDefault();

      setHasSubmitted(true);

    //   if (validationErrors.length) return alert(`Cannot Submit`);


    //   if(formType==="Create Spot") {
    //     const newBooking = {
    //         startDate,
    //         endDate
    //     }
    // }
        // if(url) await dispatch(addImage(url))

        // const spot = await dispatch(createSpot(newSpot, urls))
    //     if(booking.id) {
    //         setStartDate("")
    //         setEndDate("")
    //         setValidationErrors([]);
    //         setHasSubmitted(false);
    //         history.push('/bookings/current')
    //     }
    //   }

    //   if (formType==="Edit Spot") {

    //     const alteredBooking = {
    //         startDate,
    //         endDate
    //     }
    //     // dispatch(editSpot(alteredSpot, spotId))
    //     // if(spotId) {
    //     //     setStartDate("")
    //     //     setEndDate("")
    //     //     setValidationErrors([]);
    //     //     setHasSubmitted(false);
    //     //     history.push('/bookings/current')
    //     // }
    //   }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>

        <div>
            {/* <DatePicker></DatePicker> */}
        </div>
        <div className='start-date'>
            <label>
            Start Date
            <div>
            <input
                // type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                // placeholder='Start Date'
            />
            </div>
            </label>
        </div>

        <div className='submit-form'>
        <button type="submit">{formType}</button>
        </div>

      </form>
    );
  };


  export default BookingForm;
