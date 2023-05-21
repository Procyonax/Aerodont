import React from 'react';
import { deleteTrip } from '../../TripService';

const Trip = ({trip, removeTrip}) => {

    const handleDelete = () => {
        deleteTrip(trip._id).then(() => {
            removeTrip(trip._id)
        })
    }

    return (
        <>
            <p>from: {trip.from}</p>
            <p>to: {trip.to}</p>
            <p>nights: {trip.nights}</p>
            {/* The below round the total carbon figure to the nearest integer and adds commas to separate 1,000's */}
            <p>footprint: {Math.round(trip.footprint).toLocaleString("en-US")}kg</p>
            <button> Edit </button>
            <button onClick={handleDelete}> Delete</button>
            <hr></hr>
        </>
    )
}

export default Trip;