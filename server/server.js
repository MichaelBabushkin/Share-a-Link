require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Serve up static assets (heroku)
// if (process.env.NODE_ENV=== "production"){
//   app.use(express.static("client/build"));
// }
//

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const uri = process.env.ATLAS_URI;
mongoose.connect(uri||'mongodb+srv://Michael:Mishaba123@cluster0.cxn1c.gcp.mongodb.net/links?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const linksRouter = require('./routes/links');
const usersRouter = require('./routes/users');

app.use('/links', linksRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});