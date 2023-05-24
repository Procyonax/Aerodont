use trips;
db.dropDatabase();

db.trips.insertMany([
  {
    from: "London Heathrow Airport",
    to: "Berlin Brandenburg Airport",
    cabin: "economy",
    nights: 0,
    footprint: 290.33337299472,
  },
  {
    from: "Glasgow International Airport",
    to: "Amsterdam Airport Schiphol",
    cabin: "economy",
    nights: 14,
    footprint: 216.85157642736,
  },
  {
    from: "London Gatwick Airport",
    to: "John F Kennedy International Airport",
    cabin: "first",
    nights: 7,
    footprint: 1646.9045494765198,
  },
]);
