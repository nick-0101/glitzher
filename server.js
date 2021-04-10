const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config({ path: './config/env.config' });

// Dev
const morgan = require('morgan');
const colors = require('colors');
const responseTime = require('response-time');

// Database
const connectDB = require('./config/db');
connectDB();

const app = express();

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(responseTime());
  app.use(morgan('dev'));
}

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Helmet
app.use(helmet());

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/fetchProducts'));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.blue.bold));
