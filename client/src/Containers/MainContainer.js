import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css';
import logo from '../logo.svg';
import AirportInputField from '../Components/AirportInputField';

const MainContainer = () => {

return(
    <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            How Selfish Is Your Trip? : Coming Soon™ 
        </p>
        <AirportInputField/>
        </header>
    </div>

    // <Router>
    //     <Header "add properties"/>
    //     <Routes>
    //         <Route path "/" element = { <Dashboard "add properties"/>} />
    //         <Route path "/create_trip" element = { <TripForm "add properties"/>} />
    //         <Route path "my_trips" element = { <TripsList "add properties"/> }/>
    //     </Routes>
    // </Router>
)

}

export default MainContainer