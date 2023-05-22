import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import "./Dashboard.css";

const Dashboard = ({ totals }) => {
  const [viewTrips, setViewTrips] = useState(false);

  if (viewTrips) {
    return <Navigate to="/my_trips" />;
  }

  return (
    <div className="dash">
      <h1 className="dash-header">Dashboard</h1>
      <div className="dash-chart">Placeholder for chart plugin</div>
      <div className="dash-results">
        <div className="dash-results-CO2">
          CO2:{" "}
          <span>
            {Math.round(totals["total_footprint"]).toLocaleString("en-US")}kg
          </span>
        </div>
        <div className="dash-results-trips">
          Trips: <span>{totals["total_number_of_trips"]}</span>
        </div>
        <div className="dash-results-average">
          Average:{" "}
          <span>
            {Math.round(totals["average_trip_footprint"]).toLocaleString(
              "en-US"
            )}
            kg/trip
          </span>
        </div>
      </div>
      <div className="dash-view-trips-container">
        <button
          className="dash-view-trips"
          onClick={() => {
            setViewTrips(true);
          }}
        >
          View Trips
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
