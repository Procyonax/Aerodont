import React from 'react';
import '../App.css';
import logo from '../logo.svg';

import Trip from './Trip/Trip';

const TripsList = ({trips}) => {
    const tripList = trips.map((trip) => {
        return <Trip trip = {trip} key = {trip._id}/>
    })
    return(
        <>
            {tripList}
        </>
    )
}

export default TripsList