const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Books Web Service API is running');
});

router.use('/books', require('./books'));

module.exports = router;