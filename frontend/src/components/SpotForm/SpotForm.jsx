import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addImages, createSpot, updateSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import "./SpotForm.css";

function SpotForm({ spot, formType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [lat, setLat] = useState(spot?.lat); // optional
  const [lng, setLng] = useState(spot?.lng); // optional
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [prevImg, setPrevImg] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (!country.length) errors.country = "Country is required";
    if (!address.length) errors.address = "Address is required";
    if (!city.length) errors.city = "City is required";
    if (!state.length) errors.state = "State is required";
    if (!lat) errors.lat = "Latitude is required";
    if (!lng) errors.lng = "Longitude is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (!name.length) errors.name = "Name is required";
    if (!price) errors.price = "Price per night is required";
    if (formType === "Create" && !prevImg)
      errors.prevImg = "Preview image is required";

    setValidationErrors(errors);
  }, [
    country,
    address,
    city,
    state,
    lat,
    lng,
    description,
    name,
    price,
    prevImg,
    img1,
    img2,
    img3,
    img4,
    formType,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    spot = {
      ...spot,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };
    const images = [prevImg, img1, img2, img3, img4].filter((img) => img);
    if (!Object.keys(validationErrors).length) {
      if (formType === "Create") {
        return dispatch(createSpot(spot))
          .then((spot) => {
            dispatch(addImages(spot.id, images));
            return spot;
          })
          .then((spot) => {
            navigate(`/spots/${spot.id}`);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data.errors) setValidationErrors(data.errors);
          });
      }
      if (formType === "Update") {
        return dispatch(updateSpot(spot))
          .then((spot) => {
            navigate(`/spots/${spot.id}`);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data.errors) setValidationErrors(data.errors);
          });
      }
    }
  };

  return (
    <div className="spot-form-container">
      <h2>
        {formType === "Create" ? "Create a new Spot" : "Update your Spot"}
      </h2>
      <h3>Where&apos;s your place located?</h3>
      <p>
        Guests will only get your exact address once they booked a reservation.
      </p>

      <form onSubmit={handleSubmit} className="spot-form">
        <label>
          Country
          <div className="errors">
            {submitted &&
              validationErrors.country &&
              `${validationErrors.country}`}
          </div>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <div className="address">
          <label>
            Street Address
            <div className="errors">
              {submitted &&
                validationErrors.address &&
                `${validationErrors.address}`}
            </div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div className="city-state">
          <label>
            City
            <div className="city-label">
              <div className="errors">
                {submitted &&
                  validationErrors.city &&
                  `${validationErrors.city}`}
              </div>
            </div>
            <div className="city-state-comma">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <span className="comma">,</span>
            </div>
          </label>
          <label>
            State
            <div className="errors">
              {submitted &&
                validationErrors.state &&
                `${validationErrors.state}`}
            </div>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <label>
          Latitude
          <div className="errors">
            {submitted && validationErrors.lat && `${validationErrors.lat}`}
          </div>
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <label>
          Longitude
          <div className="errors">
            {submitted && validationErrors.lng && `${validationErrors.lng}`}
          </div>
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <label>
          <textarea
            placeholder="Please write at least 30 characters."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="10"
          />
          <div className="errors">
            {submitted &&
              validationErrors.description &&
              `${validationErrors.description}`}
          </div>
        </label>
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special.
        </p>
        <label>
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="errors">
            {submitted && validationErrors.name && `${validationErrors.name}`}
          </div>
        </label>
        <div className="spot-form-price-container">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <label>
            <div className="spot-form-price">
              <span className="dollar-sign">$ </span>
              <input
                type="text"
                placeholder="Price per night (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="errors">
              {submitted &&
                validationErrors.price &&
                `${validationErrors.price}`}
            </div>
          </label>
        </div>
        {formType === "Create" && (
          <div className="spot-form-images">
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot</p>
            <label>
              <input
                type="text"
                placeholder="Preview Image URL"
                value={prevImg}
                onChange={(e) => setPrevImg(e.target.value)}
              />
              <div className="errors">
                {submitted &&
                  validationErrors.prevImg &&
                  `${validationErrors.prevImg}`}
              </div>
            </label>
            <label>
              <input
                type="text"
                placeholder="Image URL"
                value={img1}
                onChange={(e) => setImg1(e.target.value)}
              />
              <div className="errors">
                {submitted &&
                  validationErrors.img1 &&
                  `${validationErrors.img1}`}
              </div>
            </label>
            <label>
              <input
                type="text"
                placeholder="Image URL"
                value={img2}
                onChange={(e) => setImg2(e.target.value)}
              />
              <div className="errors">
                {submitted &&
                  validationErrors.img2 &&
                  `${validationErrors.img2}`}
              </div>
            </label>
            <label>
              <input
                type="text"
                placeholder="Image URL"
                value={img3}
                onChange={(e) => setImg3(e.target.value)}
              />
              <div className="errors">
                {submitted &&
                  validationErrors.img3 &&
                  `${validationErrors.img3}`}
              </div>
            </label>
            <label>
              <input
                type="text"
                placeholder="Image URL"
                value={img4}
                onChange={(e) => setImg4(e.target.value)}
              />
              <div className="errors">
                {submitted &&
                  validationErrors.img4 &&
                  `${validationErrors.img4}`}
              </div>
            </label>
          </div>
        )}
        <button type="submit" className="spot-form-submit-btn">
          {formType} Spot
        </button>
      </form>
    </div>
  );
}

export default SpotForm;
