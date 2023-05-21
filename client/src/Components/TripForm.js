import React, {useState} from 'react';
import '../App.css';

const TripForm = ({createTrip}) => {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [cabin, setCabin] = useState("economy");
    const [nights, setNights] = useState(0);

    const handleFromChange = event => setFrom(event.target.value);
    const handleToChange = event => setTo(event.target.value);
    const handleCabinChange = event => setCabin(event.target.value);
    const handleNightsChange = event => setNights(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        const trip = {
          from: from,
          to: to,
          cabin: cabin,
          nights: nights
        }

        createTrip(trip)
        setFrom("");
        setTo("");
        setCabin("");
        setNights("");
      }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Create a new trip</h1>
                <div className="create-trip">
                    <label htmlFor="from">From:</label>
                    <input type="text" id="from" name="from" value={from} required onChange={handleFromChange}/>
                </div>
                
                <div className="create-trip">
                    <label htmlFor="to">To:</label>
                    <input type="text" id="to" name="to" value={to} required onChange={handleToChange}/>
                </div>
            
                <div className="create-trip">
                    <label htmlFor="cabin">Cabin:</label>
                    <select name="cabin" value={cabin} required onChange={handleCabinChange}>
                        <option value="economy">Economy</option>
                        <option value="premium">Premium</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </div>

                <div className="create-trip">
                    <label htmlFor="nights">Nights:</label>
                    <input type="text" id="nights" name="nights" value={nights} required onChange={handleNightsChange}/>
                </div>
            <input type="submit" name="submit" value="Save" />
      </form>
    )
}

export default TripForm;