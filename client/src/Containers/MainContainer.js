// Package and CSS imports
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";

// Component imports
import Dashboard from "../Components/Dashboard";
import TripForm from "../Components/TripForm";
import TripsList from "../Components/TripsList";
import Navbar from "../Components/Header/Navbar";
import ErrorPage from "../Components/ErrorPage";

// Service imports
import { getTrips } from "../TripService";

// Container definition
const MainContainer = () => {

const [trips, setTrips] = useState([]);

useEffect(() => {
    getTrips()
    .then((allTrips) => {
        setTrips(allTrips)
    })
},[])

const removeTrip = (id) => {
    const tripsToKeep = trips.filter(trips => trips._id !== id)
    setTrips(tripsToKeep)
}

return(
    <Router>
        <Navbar/>
        <div className="main-container">
            <Routes>
                <Route path = "/" element = { <Dashboard />} />
                <Route path = "/create_trip" element = { <TripForm /* properties to be added */ /> } />
                <Route path = "/my_trips" element = { <TripsList trips={trips} removeTrip={removeTrip} /> }/>
                <Route path = "*" element = {< ErrorPage />} />
            </Routes>
        </div>
    </Router>
)

}

export default MainContainer