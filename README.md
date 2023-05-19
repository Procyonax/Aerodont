# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# MVP

"A React application built on Express and MongoDB which will display your carbon emissions based on your upcoming holiday trip, including flight plans and hotel stays."

# Core Spec:
Allow user to submit values for their trip including outbound and inbound airport by IATA code, class of flight (i.e. economy), country and duration of stay in hotel.

Render total CO2te back to user for each trip

Contextualise CO2te with a basic comparison i.e. holiday total is 2.5CO2te = "You'd have to plant 250 trees to offset this holiday"
Calculate trend of user's trips i.e. made 5 trips this year, visually represent if the footprint is trending up or down, and return cumulative of footprint.

# Extended Spec:
For domestic trips, present user with travel alternatives i.e. train and display the delta in CO2te

For international trips, present user with less carbon intensive alternatives that are within the same continent

Pulling in highcharts library to generally make the visualisations of everything else more impressive

Hosting on AWS
