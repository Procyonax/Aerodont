import React from "react";
import "../App.css";

import Trip from "./Trip/Trip";
import TripEditForm from "./TripEditForm";

const TripsList = ({
  trips,
  removeTrip,
  handleEditClicked,
  tripToEdit,
  handleTripUpdate,
}) => {
  const tripList = trips.map((trip) => {
    if (tripToEdit != null) {
      console.log("trip._id", trip._id);
      console.log("tripToEdit", tripToEdit._id);
      if (trip._id === tripToEdit._id) {
        console.log("match triggered");
        return (
          <TripEditForm
            tripToEdit={tripToEdit}
            handleTripUpdate={handleTripUpdate}
            handleEditClicked={handleEditClicked}
          />
        );
      } else {
        return (
          <Trip
            trip={trip}
            key={trip._id}
            removeTrip={removeTrip}
            handleEditClicked={handleEditClicked}
            tripToEdit={tripToEdit}
            handleTripUpdate={handleTripUpdate}
          />
        );
      }
    } else {
      return (
        <Trip
          trip={trip}
          key={trip._id}
          removeTrip={removeTrip}
          handleEditClicked={handleEditClicked}
          tripToEdit={tripToEdit}
          handleTripUpdate={handleTripUpdate}
        />
      );
    }
  });
  return <>{tripList}</>;
};

export default TripsList;
