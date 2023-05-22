import React from 'react';
import Trip from '../Trip/Trip';
import "../../App.css";
import "./TripResult.css";

const TripResult = ({trip}) => {
return (
    <div className="trip-result-container">
        <h1>Results</h1>
            <div>Placeholder for graph</div>
            <Trip trip={trip} key={trip._id}/>
            <div>Placeholder for equivalence</div>
    </div>
    )
}

export default TripResult;