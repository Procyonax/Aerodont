import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AirportInputField = () => {

    const [airports, setAirports] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const loadAirports = async() => {
            const response = await axios.get('http://localhost:3000/')
            .then((data) => setAirports(data.name))
        }
        loadAirports()
    }, [])


    const onChangeHandler = (text) => {
        let matches = []
        console.log(airports);
        if(text.length>0){
            matches = airports.filter(airport => {
                const regex = new RegExp(`${text}`, "gi");
                return airport.name.match(regex)
            })
        }
        console.log('matches', matches);
        setSuggestions(matches)
        setText(text)
    }

    return ( 
        <div>
            <div>{text}</div>
        <input type="text"
        onChange={event => onChangeHandler(event.target.value)}
        value={text}/>
        </div>
     );
}
 
export default AirportInputField;