import React from 'react';

const Trip = ({trip}) => {

    return (
        <>
            <p>from: {trip.from}</p>
            <p>to: {trip.to}</p>
            <p>nights: {trip.nights}</p>
            <p>footprint: {Math.round(trip.footprint).toLocaleString("en-US")}kg</p>
            <button> Edit </button>
            <button> Delete</button>
            <hr></hr>
        </>
    )
}

export default Trip;