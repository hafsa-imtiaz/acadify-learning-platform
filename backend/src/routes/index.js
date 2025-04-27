const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    res.json({ message: 'API is working' });
  } catch (error) {
    next(error); // Pass errors to Express
  }
});

module.exports = router;
