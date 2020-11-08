// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const path = require('path');

const app = express();



app.use(cors());
// app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://Michael:Mishaba123@cluster0.cxn1c.gcp.mongodb.net/links?retryWrites=true&w=majority', { 	useUnifiedTopology: true,
useNewUrlParser: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const linksRouter = require('./routes/links');
const usersRouter = require('./routes/users');

app.use('/links', linksRouter);
app.use('/users', usersRouter);

//Serve up static assets (heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
