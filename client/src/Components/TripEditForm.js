import { useEffect, useState } from "react";
import AirportInputField from "./AirportInputField";
import "./TripEditForm.css"
const TripEditForm = ({handleTripUpdate, tripToEdit, handleEditClicked}) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    // const [editCabin, setEditCabin] = useState(tripToEdit.cabin)
    // const [editNights, setEditNights] = useState(tripToEdit.nights)
    const [formData, setFormData] = useState({
        from: tripToEdit.from,
        to: tripToEdit.to,
        cabin: tripToEdit.cabin,
        nights: tripToEdit.nights,
    })
    useEffect(() => {
        setFormData({
            from: from,
            to: to,
            cabin: "",
            nights: "",
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
        newFormData[event.target.name] = [event.target.value];
        setFormData(newFormData);
    }
    const onSubmit = (event) => {
        console.log("from", from);
        console.log("to", to);
        console.log("formData", formData);
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
                    <AirportInputField className="airport-input" destination='from' setTo={handleToEdit} setFrom={handleFromEdit} value={formData.from}/>
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
                        required
                        onChange={onChange}
                    >
                        <option>Please Select</option>
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </div>
                <div className="edit-trip">
                    <label htmlFor="nights">Nights: </label>
                    <input
                        type="number"
                        min="0"
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