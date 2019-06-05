const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
})

// Define a simple route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to EasyNotes. Organise and keep track of all your notes."})
});

require('./app/routes/note.routes') (app);

// Listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});