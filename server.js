const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const responseTime = require('response-time');
dotenv.config({ path: './config/env.config' });

// Database
const connectDB = require('./config/db');
connectDB();

const app = express();

// Repsonse Time
if (process.env.NODE_ENV === 'development') {
  app.use(responseTime());
}

// Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/fetchProducts'));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.blue.bold));
