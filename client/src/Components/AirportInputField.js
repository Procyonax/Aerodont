import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'

const AirportInputField = () => {

    const [airports, setAirports] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        loadAirports()
    }, [])

    const loadAirports =  () => {
        const airportFetches = []
        for(let airport of airports){
            const newFetch = fetch('http://localhost:3000/')
            airportFetches.push(newFetch)
        }
        Promise.all(airportFetches)
        .then(data => setAirports(data))
    }

    const onChangeHandler = (text) => {
        let matches = []
        // console.log(airports);
        if(text.length>0){
            matches = airports.filter(airport => {
                const regex = new RegExp(`${text}`, "gi");
                return airport.name.match(regex)
            })
        }
        // console.log('matches', matches);
        setSuggestions(matches)
        setText(text)
    }

    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    return ( 
        <div>
            {/* <div>{text}</div> */}
        <input type="text"
        onChange={event => onChangeHandler(event.target.value)}
        value={text}
        onBlur={()=>{
            setTimeout(()=>{
                setSuggestions([])
            },100);
        }}/>
        {suggestions && suggestions.map((suggestion, i)=>
        <div key={i} onClick={() => onSuggestHandler(suggestion.name)}>
            {suggestion.name}
        </div>)}
        </div>
     );
}
 
export default AirportInputField;