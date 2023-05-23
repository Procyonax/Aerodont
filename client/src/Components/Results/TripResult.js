import React from "react";
import Trip from "../Trip/Trip";
import "../../App.css";
import "./TripResult.css";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

function calculatePercentage(emission, averagePerDay) {
  const percentage = (emission / (averagePerDay * 365)) * 100;
  return percentage.toFixed(2);
}

function calculateCarbonEmissionPercentage(emission, averageEmissionPerDay) {
  const totalDays = 365; // Set the period of days for the average emission calculation

  // Calculate the average carbon emission of a single human over the set period of days
  const averageEmission = averageEmissionPerDay * totalDays;

  // Calculate the percentage by dividing the given emission by the average emission and multiplying by 100
  const percentage = (emission / averageEmission) * 100;

  // Round the percentage to two decimal places
  const roundedPercentage = Math.round(percentage * 100) / 100;

  return roundedPercentage;
}

// Example usage
const emission = 2000; // Carbon emission number (e.g., in kilograms)
const averageEmissionPerDay = 15; // Average carbon emission of a single human per day (e.g., in kilograms)

const percentage = calculateCarbonEmissionPercentage(
  emission,
  averageEmissionPerDay
);
console.log("Carbon emission percentage:", percentage);

const data = {
  datasets: [
    {
      data: [85, 15],
      backgroundColor: [
        "#00FF00",
        "#FF0000",
        "#999933",
        "#666699",
        "#CC9933",
        "#006666",
        "#3399FF",
        "#993300",
        "#CCCC99",
        "#666666",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
      ],
      display: true,
      borderColor: "#D1D6DC",
    },
  ],
};

function VacationOffset() {
  const emissionPerDay = 15; // Average carbon emission of a person per day during the vacation (e.g., in kilograms)
  const vacationDays = 7; // Number of vacation days

  const calculateTreesNeeded = (emissionPerDay, days) => {
    const emissionPerTree = 20; // Average carbon absorption of a mature tree in kilograms per year

    // Calculate the total emission for the vacation period
    const totalEmission = emissionPerDay * days;

    // Calculate the number of trees needed to offset the total emission
    const treesNeeded = Math.ceil(totalEmission / emissionPerTree);

    return treesNeeded;
  };

  const treesNeeded = calculateTreesNeeded(emissionPerDay, vacationDays);

}

const TripResult = ({ treesNeeded }) => {
  return (
    <>
      
      <div className="trip-result-container-doughnut">
      <h1>Results</h1>
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            rotation: -90,
            circumference: 180,
            cutout: "60%",
            maintainAspectRatio: true,
            responsive: true,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        ></div>
        <p>Result Score</p>
      </div>

      <div className="trip-result-equivalence">
        <p>
          You would need to plant <strong>{treesNeeded}</strong> trees to offset
          your carbon emission during the vacation.
        </p>
      </div>
    </>
  );
};

export default TripResult;
