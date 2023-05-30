// import necessary modules
const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");

// to handle CORS
app.use(cors());

// to parse JSON
app.use(express.json());

// Connect to the MongoDB server
MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("trips"); // creates a variable to reference the database
    const tripsCollection = db.collection("trips"); // creates a variable to reference the collection
    const tripsRouter = createRouter(tripsCollection); // creates a router for the collection
    app.use("/api/trips", tripsRouter); // use the tripsRouter
  })
  .catch(console.err); // logs any errors that occur during connection

// Starts the server
app.listen(9000, function () {
  console.log(`Trips server running on port ${this.address().port}`);
});
