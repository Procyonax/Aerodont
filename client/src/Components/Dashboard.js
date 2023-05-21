import React, {useState} from "react";
import { Navigate } from "react-router-dom"
import '../App.css';

const Dashboard = ({totals}) => {
    
    const [viewTrips, setViewTrips] = useState(false);
    
    if (viewTrips) {
        return <Navigate to="/my_trips" />;
    }

    return(
        <div className="dashboard">
            <header className="dash-header">
                <h1>Dashboard</h1>
            </header>
            <main className="dash-chart">
                <div>Placeholder for chart plugin</div>
                <div className="dash-results">
                    <div>CO2: {Math.round(totals["total_footprint"]).toLocaleString("en-US")} kg</div>
                    <div>Trips: {totals["total_number_of_trips"]}</div>
                    <div>Average: {Math.round(totals["average_trip_footprint"]).toLocaleString("en-US")} kg/trip</div>
                </div>
                <button onClick={() => {setViewTrips(true)}}>View Trips</button>
            </main>
        </div> 
    )
}

export default Dashboard;