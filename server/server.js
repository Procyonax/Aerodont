import express, { json } from "express";
const app = express();
import fetch from "node-fetch";

import cors from "cors";
app.use(cors());

import { MongoClient } from "mongodb";
import createRouter from "./helpers/create_router.js";

app.use(json());

MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("trips");
    const tripsCollection = db.collection("trips");
    const tripsRouter = createRouter(tripsCollection);
    app.use("/api/trips", tripsRouter);
  })
  .catch(console.err);

app.listen(9000, function () {
  console.log(`Trips server running on port ${this.address().port}`);
});
