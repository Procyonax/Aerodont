import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AirportInputField = () => {

    const [airport, setAirport] = useState([])
    useEffect(() => {
        const loadAirports = async() => {
            const response = await axios.get('https://beta4.api.climatiq.io/travel/flights');
            setAirport(response.legs.from.data)
        }
        loadAirports()
    }, [])

    return ( 
        <>
        <input type="text"/>
        </>
     );
}
 
export default AirportInputField;