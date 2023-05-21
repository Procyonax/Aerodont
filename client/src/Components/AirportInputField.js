import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'

const AirportInputField = () => {

    const [airports, setAirports] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        // const loadAirports = async() => {
        //     const response = await axios.get('http://localhost:3000/')
        //     .then((data) => setAirports(data))
        // }
        loadAirports()
    }, [])

    // const loadAirports =  () => {
    //     const airportFetches = []
    //     for(let airport of airports){
    //         const newFetch = fetch('http://localhost:3000/')
    //         airportFetches.push(newFetch)
    //     }
    //     Promise.all(airportFetches)
    //     .then(data => setAirports(data))
    // }

    const loadAirports = () => {
        fetch('https://raw.githubusercontent.com/datasets/airport-codes/master/data/airport-codes.csv')
          .then(response => {
            return response.text();
          })
          .then(csv => {
            const {data} = Papa.parse(csv, { header: true });
            console.log(data);
            const finalData = data.filter(airport => airport["iata_code"] !== "" && airport["iata_code"] !=="0" && airport["iata_code"] !== "-")
            console.log(finalData);
            finalData.pop()
            setAirports(finalData);
          })
          .catch(error => {
            console.error('Error occurred:', error);
          });
      };

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