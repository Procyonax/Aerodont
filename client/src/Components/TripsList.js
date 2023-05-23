import React from "react";
import "../App.css";
import logo from "../logo.svg";

import Trip from "./Trip/Trip";

const TripsList = ({ trips, removeTrip, handleEditClicked, tripToEdit, handleTripUpdate }) => {
  const tripList = trips.map((trip) => {
    return <Trip trip={trip} key={trip._id} removeTrip={removeTrip} handleEditClicked={handleEditClicked} tripToEdit={tripToEdit} handleTripUpdate={handleTripUpdate}/>;
  });
  return <>{tripList}</>;
};

export default TripsList;
