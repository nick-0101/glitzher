const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config({ path: './config/env.config' });

// Dev
const morgan = require('morgan');
const colors = require('colors');
const responseTime = require('response-time');

const app = express();

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(responseTime());
  app.use(morgan('dev'));
}

// Middleware
app.use(helmet());
app.use(express.json()); // req.body

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/search'));
app.use('/', require('./routes/blog'));

// Server
const PORT = 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
