// Package and CSS imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css';
import logo from '../logo.svg';

// Component imports
import Dashboard from '../Components/Dashboard';
import TripForm from '../Components/TripForm';
import TripsList from '../Components/TripsList';
import Navbar from '../Components/Header/Navbar';

// Container definition
const MainContainer = () => {

return(
    <Router>
        <Navbar/>
        <Routes>
            <Route path = "/" element = { <Dashboard/>} />
            <Route path = "/create_trip" element = { <TripForm /* properties to be added */ /> } />
            <Route path = "/my_trips" element = { <TripsList /* properties to be added */ /> }/>
        </Routes>
    </Router>
)

}

export default MainContainer