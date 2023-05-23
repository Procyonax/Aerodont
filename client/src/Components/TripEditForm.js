import { useEffect, useState } from "react";
import AirportInputField from "./AirportInputField";
import "./TripEditForm.css"
import Papa from "papaparse"

const TripEditForm = ({handleTripUpdate, tripToEdit, handleEditClicked}) => {
    
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    // const [editCabin, setEditCabin] = useState(tripToEdit.cabin)
    // const [editNights, setEditNights] = useState(tripToEdit.nights)

    const [formData, setFormData] = useState({
        from: tripToEdit.from,
        to: tripToEdit.to,
        cabin: tripToEdit.cabin.toLowerCase(),
        nights: tripToEdit.nights,
    })
 
    useEffect(() => {
        setFormData({
            from: from,
            to: to,
            cabin: formData.cabin,
            nights: formData.nights,
        });

    }, [from, to])

    const handleFromEdit = (data) => {
        console.log("handlefrom called");
        setFrom(data)
    }

    const handleToEdit = (data) => {
        console.log("handleTo called");
        setTo(data)
    }

    const onChange = (event) => {
        const newFormData = Object.assign({}, formData);
        newFormData[event.target.name] = event.target.value;
        setFormData(newFormData)
        console.log(formData);;
    }

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
            console.log(formData);
            return fetch('https://beta4.api.climatiq.io/travel/flights', {
            method: 'POST',
            headers: { Authorization: 'Bearer MXY2H3ZR0TMBA9NZQRT4AVXVP20Y' },
            body: `{"legs":[{"from":"${data[0]['iata_code']}","to":"${data[1]['iata_code']}","passengers":1,"class":"${String(formData.cabin)}"},{"from":"${data[1]['iata_code']}","to":"${data[0]['iata_code']}","passengers":1,"class":"${String(formData.cabin)}"}]}`
          });
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            return response.co2e;
          })
          
        const hotelRequest = fetch('https://beta4.api.climatiq.io/estimate', {
            method: 'POST',
            headers: { Authorization: 'Bearer MXY2H3ZR0TMBA9NZQRT4AVXVP20Y','Content-Type': 'application/json' },
            body: '{"emission_factor":{"activity_id":"accommodation_type_hotel_stay","source":"BEIS","region":"US","year":2022,"source_lca_activity":"unknown","data_version":"^1"},"parameters":{"number":1}}'
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
          console.log(totalFootprint);
          return totalFootprint;
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    };

    const onSubmit = (event) => {
        console.log("from", from);
        console.log("to", to);
        console.log("formData", formData);
        event.preventDefault();
        getCO2().then((response) => {
            const footprint = response
            console.log('footprint',footprint);
            setFormData({
            from: formData.from,
            to: formData.to,
            cabin: formData.cabin,
            nights: formData.nights,
            footprint: footprint
        })
        handleTripUpdate(tripToEdit._id, formData)
        // setFormData({
        //     from: "",
        //     to: "",
        //     cabin: "",
        //     nights: "",
        // });
        handleEditClicked(null)
    })}

    return ( 
        <div className="trip-edit-container">
            <form onSubmit={onSubmit}>
            <h1 className="edit-trip-header">Edit Trip</h1>
                <div className="edit-trip">
                    <label htmlFor="from">From: </label>
                    <AirportInputField className="airport-input" destination='from' setTo={handleToEdit} setFrom={handleFromEdit}/> 
                </div>
                    
                <div className="edit-trip">
                    <label htmlFor="to">To: </label>
                    <AirportInputField className="airport-input" destination='to' setTo={handleToEdit} setFrom={handleFromEdit}/>
                </div>

                <div className="edit-trip">
                    <label htmlFor="cabin">Cabin: </label>
                    <select
                        name="cabin"
                        value={formData.cabin}
                        selected={formData.cabin}
                        required
                        onChange={onChange}
                    >
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </div>

                <div className="edit-trip">
                    <label htmlFor="nights">Nights: </label>
                    <input
                        type="number"
                        step="1"
                        id="nights"
                        name="nights"
                        value={formData.nights}
                        required
                        onChange={onChange}
                    />
                </div>
                <div className="edit-trip-button-container">
                <input
                    className="edit-trip-button"
                    type="submit"
                    name="submit"
                    value="Edit Trip"
                />
            </div>
            </form>
        </div>
     );
}
 
export default TripEditForm;