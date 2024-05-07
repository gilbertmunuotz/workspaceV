//Import NPM packages
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3001;
var conn = require('dotenv').config();
var userroutes = require('./routes/userroutes');
var adminroutes = require('./routes/adminroutes');
var productroutes = require('./routes/productroutes');

// Connect to MongoDB 
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
connectToMongo();

// Initiate Express
var app = express();

// Add your Express middleware, and other logic here
app.use(express.json());
app.use(cors({ origin: 'https://localhost:5173' }));


app.use(userroutes);
app.use(adminroutes);
app.use(productroutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


module.exports = app;