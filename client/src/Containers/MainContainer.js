// Package and CSS imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import Trend from 'react-trend'

// Component imports
import Dashboard from "../Components/Dashboard/Dashboard";
import TripForm from "../Components/TripForm/TripForm";
import TripsList from "../Components/TripsList";
import Navbar from "../Components/Header/Navbar";
import ErrorPage from "../Components/ErrorPage";
import Footer from "../Components/Footer/Footer";
import TripResult from "../Components/Results/TripResult";

// Service imports
import TripService, {putTrip} from "../TripService";

// Container definition
const MainContainer = () => {
  const [trips, setTrips] = useState([]);
  const [totals, setTotals] = useState({});
  const [tripToEdit, setTripToEdit] = useState(null);

  useEffect(() => {
    TripService.getTrips().then((allTrips) => {
      setTrips(allTrips);
    });
  }, [tripToEdit]);

  useEffect(() => {
    setTotals(calculateTotals());
  }, [trips]);

  function calculateTotals() {
    const footprintTotal = trips.reduce((acc, it) => {
      return acc + it["footprint"];
    }, 0);
    const tripNumberTotal = trips.length;
    const averageFootprint = footprintTotal / tripNumberTotal;
    return {
      total_footprint: footprintTotal,
      total_number_of_trips: tripNumberTotal,
      average_trip_footprint: averageFootprint,
    };
  }

  const removeTrip = (id) => {
    const tripsToKeep = trips.filter((trips) => trips._id !== id);
    setTrips(tripsToKeep);
  };

  const createTrip = (newTrip) => {
    TripService.addTrip(newTrip).then((savedTrip) =>
      setTrips([...trips, savedTrip])
    );
  };

  const handleEditClicked = (trip) => {
    setTripToEdit(trip)
  };

  const handleTripUpdate = (id, trip) => {
    putTrip(id, trip)
  };

  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard totals={totals} />} />
          <Route
            path="/create_trip"
            element={<TripForm createTrip={createTrip} />}
          />
          <Route
            path="/my_trips"
            element={<TripsList trips={trips} removeTrip={removeTrip}
            handleEditClicked={handleEditClicked} tripToEdit={tripToEdit} handleTripUpdate={handleTripUpdate} />}
          />
          <Route path="/trip_result" element={<TripResult />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default MainContainer;
