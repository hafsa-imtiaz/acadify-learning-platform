// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const User = require('../models/User');

// Helper function for common registration tasks
const handleRegistration = async (userData, role) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // First, create the base User document
  const userDoc = new User({
    fullName: userData.fullName,
    email: userData.email,
    password: hashedPassword,
    profilePicture: userData.profilePicture,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : undefined,
    gender: userData.gender,
    bio: userData.bio,
    role: role, // Set role explicitly
    lastLogin: new Date()
  });
  
  // Save the user document
  const savedUser = await userDoc.save();
  
  // Create JWT token
  const token = jwt.sign(
    { id: savedUser._id, role: savedUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  // Return the saved user and token
  const userResponse = savedUser.toObject();
  delete userResponse.password; // Remove password from response
  
  return { user: userResponse, token, userId: savedUser._id };
};

// Student Registration
exports.registerStudent = async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password,
      // Common user fields 
      profilePicture,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      bio,
      // Student-specific fields
      grade,
      enrollmentYear,
      parentContact
    } = req.body;

    const userData = {
      fullName,
      email,
      password,
      profilePicture,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      bio
    };

    // First create the User document
    const { user, token, userId } = await handleRegistration(userData, 'Student');

    // Now create the Student document with reference to the User
    const studentDoc = new Student({
      user: userId, // Reference to the User document
      grade,
      enrollmentYear,
      parentContact
    });

    const savedStudent = await studentDoc.save();

    res.status(201).json({
      success: true,
      token,
      user,
      student: savedStudent
    });
    
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(error.message === 'User already exists with this email' ? 400 : 500).json({ 
      message: error.message || 'Server error during registration'
    });
  }
};

// Teacher Registration
exports.registerTeacher = async (req, res) => {
  try {
    const { 
      // Common user fields
      fullName, 
      email, 
      password,
      profilePicture,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      bio,
      // Teacher-specific required fields from updated schema
      specialization,
      teachingExperience,
      qualifications
    } = req.body;

    // First create the User document with common fields
    const { user, token, userId } = await handleRegistration({
      fullName,
      email,
      password,
      profilePicture,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      bio
    }, 'Teacher');

    // Validate required teacher fields
    if (!specialization || !teachingExperience || !qualifications || qualifications.length === 0) {
      throw new Error('Missing required teacher information');
    }

    // Create the Teacher document with just the required fields for signup
    const teacherDoc = new Teacher({
      user: userId,
      specialization,
      teachingExperience,
      qualifications
    });

    const savedTeacher = await teacherDoc.save();

    res.status(201).json({
      success: true,
      token,
      user,
      teacher: savedTeacher
    });
    
  } catch (error) {
    console.error('Teacher registration error:', error);
    
    // Handle specific error cases
    if (error.message === 'User already exists with this email') {
      return res.status(400).json({ message: error.message });
    }
    
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        details: messages 
      });
    }
    
    // Generic server error
    res.status(500).json({ 
      message: 'Server error during registration',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login (common for both roles)
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email (works for both Student and Teacher)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Fetch role-specific details (Student or Teacher)
    let roleDetails = {};
  if (user.role === 'Student') {
    roleDetails = await Student.findOne({ user: user._id }).exec();
  } else if (user.role === 'Teacher') {
    roleDetails = await Teacher.findOne({ user: user._id }).exec();
  }
  console.log(user._id);

    // Ensure roleDetails is not null, in case there’s no data for the role
    if (!roleDetails) {
      return res.status(400).json({ message: `No ${user.role} details found` });
    }

    res.json({
      success: true,
      token,
      user: userResponse,
      roleDetails
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};