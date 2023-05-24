import React, {useState} from 'react';
import './TripForm.css';
import '../../App.css';
import AirportInputField from '../AirportInputField';
import Papa from "papaparse";

const TripForm = ({ createTrip }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cabin, setCabin] = useState("Economy");
  const [nights, setNights] = useState(0);
  const [iatas, setIata] = useState([])

  const handleCabinChange = (event) => setCabin(event.target.value);
  const handleNightsChange = (event) => setNights(event.target.value);

  const getCO2 = () => {
    const flightsRequest = fetch('https://raw.githubusercontent.com/datasets/airport-codes/master/data/airport-codes.csv')
      .then((response) => {
        return response.text();
      })
      .then((csv) => {
        const { data } = Papa.parse(csv, { header: true });
        console.log(data);
        const finalData = data.filter((airport) => airport['name'] == from || airport['name'] == to);
        console.log(finalData);
        return finalData;})
      .then((data) => {
        console.log(cabin);
        return fetch('https://beta4.api.climatiq.io/travel/flights', {
        method: 'POST',
        headers: { Authorization: 'Bearer MXY2H3ZR0TMBA9NZQRT4AVXVP20Y' },
        body: `{"legs":[{"from":"${data[0]['iata_code']}","to":"${data[1]['iata_code']}","passengers":1,"class":"${String(cabin)}"},{"from":"${data[1]['iata_code']}","to":"${data[0]['iata_code']}","passengers":1,"class":"${String(cabin)}"}]}`
      });
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response.co2e;
      })
      
    const hotelRequest = fetch('https://raw.githubusercontent.com/datasets/airport-codes/master/data/airport-codes.csv') 
      .then((response) => {
        return response.text();
      })
      .then((csv) => {
        const { data } = Papa.parse(csv, { header: true });
        console.log(data);
        const finalData = data.filter((airport) => airport['name'] == from || airport['name'] == to);
        console.log(finalData);
        return finalData;})
        .then((data) => {
          console.log(nights);
          return fetch('https://beta4.api.climatiq.io/estimate', {
            method: 'POST',
            headers: { Authorization: 'Bearer MXY2H3ZR0TMBA9NZQRT4AVXVP20Y','Content-Type': 'application/json' },
            body: `{"emission_factor":{"activity_id":"accommodation_type_hotel_stay","source":"BEIS","region":"${data[1]['iso_country']}","year":2022,"source_lca_activity":"unknown","data_version":"^1"},"parameters":{"number":${nights}}}`
          })
        })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hotel request failed with status: ' + response.status);
      }
      return response.json();
    })
    .then(response => {
      console.log(response);
      return response.co2e;
    });

  return Promise.all([flightsRequest, hotelRequest])
    .then(([flightFootprint, hotelFootprint]) => {
        console.log('flight', flightFootprint);
        console.log('hotel', hotelFootprint);
      const totalFootprint = flightFootprint + hotelFootprint;
      return totalFootprint;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    getCO2().then((response) => {
        console.log(response);
        const footprint = response
        console.log('footprint',footprint);
      const trip = {
        from: from,
        to: to,
        cabin: cabin,
        nights: nights,
        footprint: footprint, 
      };
      console.log(trip);
      createTrip(trip);
      setFrom("");
      setTo("");
      setCabin("");
      setNights("");
      setIata([])
    });
  };

  return (
    <div className="trip-form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="create-trip-header">Create Trip</h1>
        <div className="create-trip">
          <label htmlFor="from">From: </label>
          <AirportInputField
            destination="from"
            setTo={setTo}
            setFrom={setFrom}
          />
        </div>

        <div className="create-trip">
          <label htmlFor="to">To: </label>
          <AirportInputField destination="to" setTo={setTo} setFrom={setFrom} />
        </div>

        <div className="create-trip">
          <label htmlFor="cabin">Cabin: </label>
          <select
            name="cabin"
            value={cabin}
            required
            onChange={handleCabinChange}
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        {/* <div>
            <label htmlFor="cabin">Cabin: </label>
            <input
                type="text"
                value={cabin}
                required
                onChange={handleCabinChange}
                />
        </div> */}

        <div className="create-trip">
          <label htmlFor="nights">Nights: </label>
          <input
            type="number"
            min = "0"
            step="1"
            id="nights"
            name="nights"
            value={nights}
            required
            onChange={handleNightsChange}
          />
        </div>
        <div className="create-trip-button-container">
          {/* <Link to="/trip_result"> */}
            <input
              className="create-trip-button"
              type="submit"
              name="submit"
              value="Create Trip"
            />
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};

export default TripForm;
