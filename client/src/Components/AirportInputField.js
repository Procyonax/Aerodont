import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const AirportInputField = ({destination, setTo, setFrom, setEditTo, setEditFrom}) => {
  const [airports, setAirports] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    loadAirports();
  }, []);

  useEffect(() => {
    if (destination === 'from'){
      setFrom(text)
    }
    if (destination === 'to'){
      setTo(text)
    }
  }, [text])

  useEffect(() => {
    if (destination === 'from-edit'){
      setEditFrom(text)
    }
    if (destination === 'to-edit'){
      setEditTo(text)
    }
  }, [text])
  

    const loadAirports = () => {
        fetch('https://raw.githubusercontent.com/datasets/airport-codes/master/data/airport-codes.csv')
          .then(response => {
            return response.text();
          })
          .then(csv => {
            const {data} = Papa.parse(csv, { header: true });
            // console.log(data);
            const finalData = data.filter(airport => airport["iata_code"] !== "" && airport["iata_code"] !=="0" && airport["iata_code"] !== "-")
            // console.log(finalData);
            finalData.pop()
            setAirports(finalData);
          })
          .catch(error => {
            console.error('Error occurred:', error);
          });
      };

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
        // setFrom(foundAirport)
        // setTo(foundAirport)
    }

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(event) => onChangeHandler(event.target.value)}
        value={text}
        />
        {suggestions && suggestions.map((suggestion, i)=>
        <div key={i} onClick={() => onSuggestHandler(suggestion.name)}>
            {suggestion.name}
          </div>
        )}
    </div>
  );
};

export default AirportInputField;
