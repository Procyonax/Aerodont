import React from 'react';
import '../App.css';
import logo from '../logo.svg';

import Trip from './Trip/Trip';

const TripsList = ({trips, removeTrip}) => {
    const tripList = trips.map((trip) => {
        return <Trip trip = {trip} key = {trip._id} removeTrip = {removeTrip}/>
    })
    return(
        <>
            {tripList}
        </>
    )
}

export default TripsList