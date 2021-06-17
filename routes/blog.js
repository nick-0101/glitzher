const express = require('express');
const pool = require('../config/db');

// router
const router = express.Router();

router.get('/blog', (req, res) => {
  res.json('Welcome to my blog ');
});
module.exports = router;
