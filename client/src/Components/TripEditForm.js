import { useState } from "react";
import AirportInputField from "./AirportInputField";
import "./TripEditForm.css"

const TripEditForm = ({handleTripUpdate, tripToEdit, handleEditClicked}) => {
    
    const [editFrom, setEditFrom] = useState("");
    const [editTo, setEditTo] = useState("");

    const [formData, setFormData] = useState({
        from: tripToEdit.editFrom,
        to: tripToEdit.editTo,
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
            editFrom: "",
            editTo: "",
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
                    <AirportInputField className="airport-input" destination='from-edit' setEditTo={setEditTo} setEditFrom={setEditFrom}/> 
                </div>
                    
                <div className="edit-trip">
                    <label htmlFor="to">To: </label>
                    <AirportInputField className="airport-input" destination='to-edit' setEditTo={setEditTo} setEditFrom={setEditFrom}/>
                </div>

                <div className="edit-trip">
                    <label htmlFor="cabin">Cabin: </label>
                    <select
                        name="cabin"
                        value={formData.cabin}
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