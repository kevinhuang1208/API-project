import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, changeSpot, createSpot, editSpot } from '../../store/spots';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SpotForm = ({ formType }) => {
    const history = useHistory();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState({url: "", preview: true})
    const [url2, setUrl2] = useState({url: "", preview: false})
    const [url3, setUrl3] = useState({url: "", preview: false})
    const [url4, setUrl4] = useState({url: "", preview: false})
    const [url5, setUrl5] = useState({url: "", preview: false})
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const urls = [url, url2, url3, url4, url5]
    // console.log(urls)



    useEffect(() => {
        let errors = [];
        if (!country.length) errors.push("Country is required");
        if (!address.length) errors.push("Address is required");
        if (!city.length) errors.push("City is required")
        if(!state.length) errors.push("State is required")
        if(description.length < 30) errors.push("Description needs a minimum of 30 characters")
        if(!name.length) errors.push("Name is required")
        if(!price) errors.push("Price is required")
        if(!Object.keys(url).length) errors.push("Preview image is required")
        if(url.url && !url.url.endsWith(".png") && !url.url.endsWith(".jpg") && !url.url.endsWith(".jpeg")) errors.push("Image URL must end in .png, .jpg, .jpeg")
        setValidationErrors(errors);
    }, [country, address, city, state, description, name, price, url])

    const dispatch = useDispatch()
    const {spotId} = useParams()


    const theSpot = useSelector(state=>state.spots.allSpots[spotId])
    // //conditoinals to prepopulate inputs


    // console.log('here is the spot in spotsform', theSpot)

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
        // const theSpot = useSelector(state=>state.spots.allSpots[spotId])

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
      <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <div>
            <label>
            Country  {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        {validationErrors.map((error) => {
                            if(error === "Country is required") return error
                        }
                        )}
                     </div>
                    )}
            <div>
            {formType==="Edit Spot" ?
            <input
                type="text"
                value={theSpot.country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Country'
            />
            :
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Country'
            />
                    }
            </div>
        </label>
        </div>
        <div>
            <label>
            Street Address {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        {validationErrors.map((error) => {
                            if(error === "Address is required") return error
                        }
                        )}
                     </div>
                    )}
            <div>
            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Address'
             />
            </div>
            </label>
        </div>
        <div>
            <label>
            City {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        {validationErrors.map((error) => {
                            if(error === "City is required") return error
                        }
                        )}
                     </div>
                    )}

            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
             />

            , </label>

            <label>
            State {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        {validationErrors.map((error) => {
                            if(error === "State is required") return error
                        }
                        )}
                     </div>
                    )}
            <input
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
                <div>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your spot'
            />
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    {validationErrors.map((error) => {
                        if(error === "Name is required") return error
                        }
                    )}
                </div>
            )}
        </div>


        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results</p>

        {/* {formType==="Edit Spot" ?
        <>
        <div> $
        <input
            value={spotPrice}
            onChange={(e) => setSpotPrice(e.target.value)}
            placeholder='Price per Night (USD)'
            />
        </div>
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    {validationErrors.map((error) => {
                        if(error === "Price is required") return error
                        }
                    )}
                </div>
            )}
        </div>
        </>
        : */}
        <>
        <div> $
        <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price per Night (USD)'
            />
        </div>
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
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
        <div>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot</p>

        <input
            value={url.url}
             onChange={(e) => setUrl({url: e.target.value, preview: true})}
            placeholder='Preview Image URL'
            />
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    {validationErrors.map((error) => {
                        if(error === "Preview image is required") return error
                        }
                    )}
                </div>
            )}
        </div>
        <div>
        <input
            value={url2.url}
            onChange={(e) => setUrl2(e.target.value)}
            placeholder='Image URL'
        />
        </div>
        <div>
        <input
            value={url3.url}
            onChange={(e) => setUrl3(e.target.value)}
            placeholder='Image URL'
        />
        </div>
        <div>
        <input
            value={url4.url}
            onChange={(e) => setUrl4(e.target.value)}
            placeholder='Image URL'
        />
        </div>
        <div>
        <input
            value={url5.url}
            onChange={(e) => setUrl5(e.target.value)}
            placeholder='Image URL'
        />
        </div>
        </div>
        : <></> }
        <button type="submit">{formType}</button>


      </form>
    );
  };

  export default SpotForm;
