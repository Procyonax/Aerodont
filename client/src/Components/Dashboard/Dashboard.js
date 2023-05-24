import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import "./Dashboard.css";
// @ts-ignore
import Trend from "react-trend";

const TrendLine = () => (
  <Trend
    smooth
    autoDraw
    autoDrawDuration={3000}
    autoDrawEasing="ease-out"
    data={[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]}
    gradient={["green", "orange", "red"]}
    radius={0}
    strokeWidth={3.3}
    strokeLinecap={"butt"}
  />
);

const Dashboard = ({ totals }) => {
  const [viewTrips, setViewTrips] = useState(false);

  if (viewTrips) {
    return <Navigate to="/my_trips" />;
  }

  return (
    <div className="dash">
      <div className="dash-chart">
        <TrendLine />
      </div>
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
