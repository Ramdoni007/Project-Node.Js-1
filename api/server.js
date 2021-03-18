const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; 
const cors = require('cors');

const routes = require('./route')
const handlerErrors = require('./middlewares/errorHandlers')

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'dinotesDB';
app.use (cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to Database
MongoClient.connect(url, (err, client) => {
  const db = client.db(dbName);
  const notesCollection = db.collection('notes');
  app.locals.notesCollection = notesCollection;
});
// Routes
app.use(handlerErrors);
app.use('/', routes);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

