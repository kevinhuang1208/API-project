import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, changeSpot, createSpot, editSpot } from '../../store/spots';
import './SpotForm.css'

const SpotForm = ({ formType }) => {
    const history = useHistory();

    const {spotId} = useParams()

    const theSpot = useSelector(state=>state.spots.allSpots[spotId])

    const [country, setCountry] = useState(spotId ? theSpot.country : "");
    const [address, setAddress] = useState(spotId ? theSpot.address : "");
    const [city, setCity] = useState(spotId ? theSpot.city : "")
    const [state, setState] = useState(spotId ? theSpot.state : "")
    const [description, setDescription] = useState(spotId ? theSpot.description : "")
    const [name, setName] = useState(spotId ? theSpot.name : "")
    const [price, setPrice] = useState(spotId ? theSpot.price : "")
    const [url, setUrl] = useState({url: "", preview: true})
    const [url2, setUrl2] = useState({url: "", preview: false})
    const [url3, setUrl3] = useState({url: "", preview: false})
    const [url4, setUrl4] = useState({url: "", preview: false})
    const [url5, setUrl5] = useState({url: "", preview: false})
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const urls = [url, url2, url3, url4, url5]


    useEffect(() => {
        let errors = [];
        if (!country.length) errors.push("Country is required");
        if (!address.length) errors.push("Address is required");
        if (!city.length) errors.push("City is required")
        if(!state.length) errors.push("State is required")
        if(description.length < 30) errors.push("Description needs a minimum of 30 characters")
        if(!name.length) errors.push("Name is required")
        if(!price) errors.push("Price is required")
        if(!url.url && formType==="Create Spot") errors.push("Preview image is required")
        if(url.url && !url.url.endsWith(".png") && !url.url.endsWith(".jpg") && !url.url.endsWith(".jpeg")) errors.push("Image URL must end in .png, .jpg, .jpeg")
        if(url2.url && !url2.url.endsWith(".png") && !url2.url.endsWith(".jpg") && !url2.url.endsWith(".jpeg")) errors.push("Image URL2 must end in .png, .jpg, .jpeg")
        if(url3.url && !url3.url.endsWith(".png") && !url3.url.endsWith(".jpg") && !url3.url.endsWith(".jpeg")) errors.push("Image URL3 must end in .png, .jpg, .jpeg")
        if(url4.url && !url4.url.endsWith(".png") && !url4.url.endsWith(".jpg") && !url4.url.endsWith(".jpeg")) errors.push("Image URL4 must end in .png, .jpg, .jpeg")
        if(url5.url && !url5.url.endsWith(".png") && !url5.url.endsWith(".jpg") && !url5.url.endsWith(".jpeg")) errors.push("Image URL5 must end in .png, .jpg, .jpeg")
        setValidationErrors(errors);
    }, [country, address, city, state, description, name, price, url, url2, url3, url4, url5])

    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
      e.preventDefault();

      setHasSubmitted(true);

      if (validationErrors.length) return alert(`Cannot Submit`);


      if(formType==="Create Spot") {
        const newSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            SpotImages: urls
        }

        // if(url) await dispatch(addImage(url))

        const spot = await dispatch(createSpot(newSpot, urls))
        if(spot.id) {
            setCountry("")
            setAddress("")
            setCity("")
            setState("")
            setDescription("")
            setName("")
            setPrice("")
            setUrl("")
            setValidationErrors([]);
            setHasSubmitted(false);
            history.push(`/spots/${spot.id}`)
        }
      }

      if (formType==="Edit Spot") {

        const alteredSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price
        }
        dispatch(editSpot(alteredSpot, spotId))
        if(spotId) {
            setCountry("")
            setAddress("")
            setCity("")
            setState("")
            setDescription("")
            setName("")
            setPrice("")
            setValidationErrors([]);
            setHasSubmitted(false);
            history.push(`/spots/${spotId}`)
        }
      }
    };


    return (
      <form id='spotForm' onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <div className='country'>
            <label>
            Country  {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors'>
                        {validationErrors.map((error) => {
                            if(error === "Country is required") return error
                        }
                        )}
                     </div>
                    )}
            <div>
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Country'
            />
            </div>
        </label>
        </div>

        <div className='street-address'>
            <label>
            Street Address {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors'>
                        {validationErrors.map((error) => {
                            if(error === "Address is required") return error
                        }
                        )}
                     </div>
                    )}
            <div>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Address'
            />
            </div>
            </label>
        </div>

        <div className='city-and-state'>
            <label>
            City {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors'>
                        {validationErrors.map((error) => {
                            if(error === "City is required") return error
                        }
                        )}
                     </div>
                    )}

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
            />
            , </label>

            <label>
            State {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors'>
                        {validationErrors.map((error) => {
                            if(error === "State is required") return error
                        }
                        )}
                     </div>
                    )}

            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder='STATE'
            />

            </label>
        </div>


        <h3>Describe your place to guests</h3>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Please write at least 30 characters'
            />

        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Description needs a minimum of 30 characters") return error
                        }
                    )}
                </div>
            )}
        </div>

        <h3>Create a title for your spot</h3>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>


        <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name of your spot'
        />
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Name is required") return error
                        }
                    )}
                </div>
            )}
        </div>


        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results</p>

        <>
        <div> $
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Price per Night (USD)'
            />
        </div>
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Price is required") return error
                        }
                    )}
                </div>
            )}
        </div>
        </>

                    {/* } */}
        {formType==="Create Spot" ?
        <div className='img1'>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot</p>

        <input
            value={url.url}
             onChange={(e) => setUrl({url: e.target.value, preview: true})}
            placeholder='Preview Image URL'
            />

            {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Preview image is required") return error
                        if(error === "Image URL must end in .png, .jpg, .jpeg") return error
                        }
                    )}
                </div>
            )}

        <div className='img2'>
        <input
            value={url2.url}
            onChange={(e) => setUrl2({url: e.target.value, preview: false})}
            placeholder='Image URL'
        />
        {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Image URL2 must end in .png, .jpg, .jpeg") return error
                        }
                    )}
                </div>
            )}
        </div>
        <div className='img3'>
        <input
            value={url3.url}
            onChange={(e) => setUrl3({url: e.target.value, preview: false})}
            placeholder='Image URL'
        />
         {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Image URL3 must end in .png, .jpg, .jpeg") return error
                        }
                    )}
                </div>
            )}
        </div>
        <div className='img4'>
        <input
            value={url4.url}
            onChange={(e) => setUrl4({url: e.target.value, preview: false})}
            placeholder='Image URL'
        />
         {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Image URL4 must end in .png, .jpg, .jpeg") return error
                        }
                    )}
                </div>
            )}
        </div>
        <div className='img5'>
        <input
            value={url5.url}
            onChange={(e) => setUrl5({url: e.target.value, preview: false})}
            placeholder='Image URL'
        />
         {hasSubmitted && validationErrors.length > 0 && (
                <div className='errors'>
                    {validationErrors.map((error) => {
                        if(error === "Image URL5 must end in .png, .jpg, .jpeg") return error
                        }
                    )}
                </div>
            )}
        </div>
        </div>
        : <></> }
        <div className='submit-form'>
        <button type="submit">{formType}</button>
        </div>

      </form>
    );
  };

  export default SpotForm;
