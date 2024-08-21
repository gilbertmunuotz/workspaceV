//Import NPM packages
var path = require('path');
var cors = require('cors');
var express = require('express');
var dotenv = require('dotenv');
dotenv.config(); // Load environment variables
var { CLIENT_API } = require('./utilities/constants');
var port = process.env.PORT;
var mongoose = require('mongoose');
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
app.use(cors({
  origin: `${CLIENT_API}`,
  methods: ["GET", "POST", "PUT", "DELETE",],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Serve images from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public')));

app.use(userroutes);
app.use(adminroutes);
app.use(productroutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


module.exports = app;