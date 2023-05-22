import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './TripForm.css';
import '../../App.css';
import AirportInputField from '../AirportInputField';

const TripForm = ({ createTrip }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cabin, setCabin] = useState("");
  const [nights, setNights] = useState(0);

  const handleCabinChange = (event) => setCabin(event.target.value);
  const handleNightsChange = (event) => setNights(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trip = {
      from: from,
      to: to,
      cabin: cabin,
      nights: nights,
    };

    createTrip(trip);
    setFrom("");
    setTo("");
    setCabin("");
    setNights("");
  };


    return(
        <div className="trip-form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="create-trip-header">Create Trip</h1>
            <div className="create-trip">
                <label htmlFor="from">From: </label>
                <AirportInputField destination='from' setTo={setTo} setFrom={setFrom}/> 
            </div>
                    
            <div className="create-trip">
                <label htmlFor="to">To: </label>
                <AirportInputField destination='to' setTo={setTo} setFrom={setFrom}/>
            </div>

            <div className="create-trip">
              <label htmlFor="cabin">Cabin: </label>
              <select
                name="cabin"
                value={cabin}
                required
                onChange={handleCabinChange}
              >
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>

            <div className="create-trip">
              <label htmlFor="nights">Nights: </label>
              <input
                type="number"
                step="1"
                id="nights"
                name="nights"
                value={nights}
                required
                onChange={handleNightsChange}
              />
            </div>
        <div className="create-trip-button-container">
          <Link to="/trip_result">
            <input
              className="create-trip-button"
              type="submit"
              name="submit"
              value="Create Trip"
            />
            </Link>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
