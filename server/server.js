const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(express.json());

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
.then((client) => {
  const db = client.db('trips');
  const tripsCollection = db.collection('trips');
  const tripsRouter = createRouter(tripsCollection);
  app.use('/api/trips', tripsRouter);
})
.catch(console.err);

app.listen(9000, function() {
  console.log(`Trips server running on port ${this.address().port}`);
});
