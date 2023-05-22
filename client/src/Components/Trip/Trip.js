import React from "react";
import TripService from "../../TripService";
import "../../App.css";
import "./Trip.css";

const Trip = ({ trip, removeTrip }) => {
  const handleDelete = () => {
    TripService.deleteTrip(trip._id).then(() => {
      removeTrip(trip._id);
    });
  };

  return (
    <div className="trip-container">
      <div className="trip">
        <p className="trip-from">
          {" "}
          From: <span>{trip.from}</span>
        </p>
        <p className="trip-to">
          {" "}
          To: <span>{trip.to}</span>
        </p>
        <p className="trip-nights">
          {" "}
          Nights: <span>{trip.nights}</span>
        </p>
        {/* The below rounds the total carbon figure to the nearest integer and adds commas to separate 1,000's */}
        <p className="trip-footprint">
          {" "}
          Footprint:{" "}
          <span>{Math.round(trip.footprint).toLocaleString("en-US")}kg</span>
        </p>
        <div className="trip-buttons">
          <button className="trip-edit"> Edit </button>
          <button className="trip-delete" onClick={handleDelete}>
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trip;
