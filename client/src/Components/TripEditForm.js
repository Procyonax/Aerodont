import { useState } from "react";
import AirportInputField from "./AirportInputField";

const TripEditForm = ({handleTripUpdate, tripToEdit, handleEditClicked}) => {
    
    const [formData, setFormData] = useState({
        from: tripToEdit.from,
        to: tripToEdit.to,
        cabin: tripToEdit.cabin,
        nights: tripToEdit.nights,
    })

    const onChange = (event) => {
        const newFormData = Object.assign({}, formData);
        newFormData[event.target.name] = [event.target.value];
        setFormData(newFormData);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handleTripUpdate(tripToEdit._id, formData)
        setFormData({
            from: "",
            to: "",
            cabin: "",
            nights: "",
        });
        handleEditClicked(null)
    }

    return ( 
        <div className="trip-edit-container">
            <form onSubmit={onSubmit}>
            <h1 className="edit-trip-header">Edit Trip</h1>
                <div className="edit-trip">
                    <label htmlFor="from">From: </label>
                    <AirportInputField destination='from' setTo={setTo} setFrom={setFrom}/> 
                </div>
                    
                <div className="edit-trip">
                    <label htmlFor="to">To: </label>
                    <AirportInputField destination='to' setTo={setTo} setFrom={setFrom}/>
                </div>

                <div className="edit-trip">
                    <label htmlFor="cabin">Cabin: </label>
                    <select
                        name="cabin"
                        value={formData.cabin}
                        required
                        onChange={onChange}
                    >
                        <option value="Economy">Economy</option>
                        <option value="Premium">Premium</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
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