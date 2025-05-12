const express = require('express');
const router = express.Router();
const { registerStudent, registerTeacher, logIn } = require('../controllers/authController'); 
console.log('Auth routes loaded');

router.post('/register/student', registerStudent);
router.post('/register/teacher', registerTeacher);
router.post('/login', logIn);

// In app.js, before setting up routes
console.log('Setting up routes...');
module.exports = router;
