import React, {useState} from "react";
import { Navigate } from "react-router-dom"
import '../App.css';

const Dashboard = () => {
    
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
                    <div>CO2 & num</div>
                    <div>Trips & num</div>
                    <div>Average & num</div>
                </div>
                <button onClick={() => {setViewTrips(true)}}>View Trips</button>
            </main>
        </div> 
    )
}

export default Dashboard;