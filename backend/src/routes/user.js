const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/profile-images';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use userId plus timestamp to ensure uniqueness
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, 'profile-' + uniqueSuffix + fileExt);
  }
});

// File filter for profile images
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * GET /users
 * Get all users with optional filtering and pagination
 */
router.get('/', async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      role,
      isActive,
      sort = 'createdAt', 
      order = 'desc',
      search
    } = req.query;

    // Build query object based on filters
    const query = {};
    
    if (role) {
      query.role = role;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Prepare sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    // Get total count for pagination info
    const total = await User.countDocuments(query);
    
    // Execute query with pagination and sorting
    const users = await User.find(query)
      .select('-password') // Exclude password from results
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /users/:id
 * Get a single user by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    }).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /users
 * Create a new user
 */
router.post('/', async (req, res, next) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      role, 
      phoneNumber, 
      address, 
      dateOfBirth, 
      gender,
      bio,
      socialLinks
    } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      bio,
      socialLinks,
      lastLogin: new Date()
    });
    
    await newUser.save();
    
    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /users/:id
 * Update a user
 */
router.put('/:id', async (req, res, next) => {
  try {
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Define fields that can be updated
    const updatableFields = [
      'fullName', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 
      'bio', 'socialLinks', 'isActive', 'role'
    ];
    
    // Update fields if provided
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        // Handle nested socialLinks object specifically
        if (field === 'socialLinks' && typeof req.body.socialLinks === 'object') {
          user.socialLinks = {
            ...user.socialLinks,
            ...req.body.socialLinks
          };
        } else {
          user[field] = req.body[field];
        }
      }
    });
    
    // Handle password update separately
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, 12);
    }
    
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /users/:id
 * Partial update a user
 */
router.patch('/:id', async (req, res, next) => {
  try {
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Define fields that can be updated
    const updatableFields = [
      'fullName', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 
      'bio', 'socialLinks', 'isActive', 'role'
    ];
    
    // Update fields if provided
    Object.keys(req.body).forEach(field => {
      if (updatableFields.includes(field)) {
        // Handle nested socialLinks object specifically
        if (field === 'socialLinks' && typeof req.body.socialLinks === 'object') {
          user.socialLinks = {
            ...user.socialLinks,
            ...req.body.socialLinks
          };
        } else {
          user[field] = req.body[field];
        }
      }
    });
    
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /users/:id
 * Delete a user (hard delete)
 */
router.delete('/:id', async (req, res, next) => {
  try {
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if we should perform soft delete instead
    if (req.query.soft === 'true') {
      user.isActive = false;
      await user.save();
    } else {
      // If user has a profile picture, delete it from server
      if (user.profilePicture) {
        const profilePicPath = path.join(__dirname, '..', user.profilePicture);
        if (fs.existsSync(profilePicPath)) {
          fs.unlinkSync(profilePicPath);
        }
      }
      
      await User.deleteOne({ _id: user._id });
    }
    
    res.json({ 
      success: true, 
      message: req.query.soft === 'true' ? 'User has been deactivated' : 'User has been deleted'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /users/login
 * User login
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is inactive' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ 
      message: 'Login successful',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /users/profile-image/:id
 * Update user profile image
 */
router.post('/profile-image/:id', upload.single('profileImage'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      // Delete uploaded file since user doesn't exist
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete old profile image if it exists
    if (user.profilePicture) {
      const oldImagePath = path.join(__dirname, '..', user.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    // Update user with new profile image path
    user.profilePicture = '/' + req.file.path.replace(/\\/g, '/'); // Convert Windows backslashes to forward slashes
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      message: 'Profile image updated successfully',
      user: userResponse
    });
  } catch (error) {
    // Delete uploaded file in case of error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    next(error);
  }
});

/**
 * DELETE /users/profile-image/:id
 * Remove user profile image
 */
router.delete('/profile-image/:id', async (req, res, next) => {
  try {
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete profile image if it exists
    if (user.profilePicture) {
      const imagePath = path.join(__dirname, '..', user.profilePicture);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      
      // Reset profile picture field
      user.profilePicture = undefined;
      await user.save();
    } else {
      return res.status(400).json({ message: 'User does not have a profile image' });
    }
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      message: 'Profile image removed successfully',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /users/change-password/:id
 * Change user password
 */
router.post('/change-password/:id', async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }
    
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update password
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /users/search/:query
 * Search users by name or email
 */
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params;
    const { role } = req.query;
    
    // Build search query
    const searchQuery = {
      $text: { $search: query }
    };
    
    // Add role filter if provided
    if (role) {
      searchQuery.role = role;
    }
    
    // Execute search
    const users = await User.find(
      searchQuery,
      { 
        score: { $meta: "textScore" },
        password: 0 // Exclude password
      }
    )
    .sort({ score: { $meta: "textScore" } })
    .limit(20);
    
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /users/:id/activate
 * Activate a user account
 */
router.put('/:id/activate', async (req, res, next) => {
  try {
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Activate user
    user.isActive = true;
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      message: 'User account activated successfully',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /users/:id/deactivate
 * Deactivate a user account
 */
router.put('/:id/deactivate', async (req, res, next) => {
  try {
    // Find user by ID, userId, or email
    const user = await User.findOne({ 
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { userId: req.params.id },
        { email: req.params.id }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Deactivate user
    user.isActive = false;
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      message: 'User account deactivated successfully',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;