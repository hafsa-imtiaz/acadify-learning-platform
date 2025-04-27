const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const createError = require('http-errors');

/**
 * Error handler helper function
 */
const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

/**
 * Transaction helper function
 */
const withTransaction = async (callback) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const result = await callback(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * Validation middleware
 */
const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    next();
  };
};

/**
 * GET /teachers
 * Get all teachers with optional filtering
 */
router.get('/', async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sort = 'averageRating', 
      order = 'desc',
      specialization,
      teachingExperience,
      minRating
    } = req.query;
    
    // Input validation
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (isNaN(pageNum) || pageNum < 1) {
      return handleError(res, 400, 'Invalid page parameter');
    }
    
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return handleError(res, 400, 'Invalid limit parameter (must be between 1-100)');
    }
    
    if (minRating && (isNaN(parseFloat(minRating)) || parseFloat(minRating) < 0 || parseFloat(minRating) > 5)) {
      return handleError(res, 400, 'Invalid minRating parameter (must be between 0-5)');
    }
    
    // Build query object based on filters
    const query = {};
    
    if (specialization) {
      query.specialization = specialization;
    }
    
    if (teachingExperience) {
      query.teachingExperience = teachingExperience;
    }
    
    if (minRating) {
      query.averageRating = { $gte: parseFloat(minRating) };
    }
    
    // Calculate skip for pagination
    const skip = (pageNum - 1) * limitNum;
    
    // Prepare sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    // Use Promise.all to run queries in parallel
    const [total, teachers] = await Promise.all([
      Teacher.countDocuments(query),
      Teacher.find(query)
        .populate('user', 'fullName email profilePicture')
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean() // Use lean() for better performance when we don't need Mongoose documents
    ]);
    
    res.json({
      teachers,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(createError(500, 'Error retrieving teachers: ' + error.message));
  }
});

/**
 * GET /teachers/:userId
 * Get a teacher profile by user ID
 */
router.get('/:userId', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    const teacher = await Teacher.findOne({ user: req.params.userId })
      .populate('user')
      .populate('courses')
      .populate({
        path: 'reviews',
        options: { 
          sort: { createdAt: -1 },
          limit: 10
        }
      })
      .lean();
      
    if (!teacher) {
      return handleError(res, 404, 'Teacher profile not found');
    }
    
    res.json(teacher);
  } catch (error) {
    next(createError(500, 'Error retrieving teacher profile: ' + error.message));
  }
});

/**
 * POST /teachers
 * Create a new teacher profile
 */
router.post('/', validateRequest([
  check('teacherData').isObject().withMessage('Teacher data is required'),
  check('userData').isObject().withMessage('User data is required')
]), async (req, res, next) => {
  try {
    const { userData, teacherData } = req.body;
    
    const result = await withTransaction(async (session) => {
      // First create the user if it doesn't exist
      let user;
      
      if (userData._id) {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userData._id)) {
          throw createError(400, 'Invalid user ID format');
        }
        
        // Update existing user
        user = await User.findById(userData._id).session(session);
        
        if (!user) {
          throw createError(404, 'User not found');
        }
        
        user.role = 'Teacher'; // Ensure role is set to Teacher
        await user.save({ session });
      } else {
        // Create new user
        user = new User({
          ...userData,
          role: 'Teacher'
        });
        
        await user.save({ session });
      }
      
      // Check if teacher profile already exists
      const existingTeacher = await Teacher.findOne({ user: user._id }).session(session);
      
      if (existingTeacher) {
        throw createError(400, 'Teacher profile already exists for this user');
      }
      
      // Create teacher profile linked to the user with default values for statistics
      const newTeacher = new Teacher({
        ...teacherData,
        user: user._id,
        coursesCreated: 0,
        totalStudents: 0,
        averageRating: 0,
        totalRatings: 0,
        responseTimeAverage: 0,
        isVerified: false
      });
      
      const savedTeacher = await newTeacher.save({ session });
      
      // Return the teacher with populated user information
      return Teacher.findById(savedTeacher._id).populate('user').lean();
    });
    
    res.status(201).json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error creating teacher profile: ' + error.message));
  }
});

/**
 * PUT /teachers/:userId
 * Update a teacher profile
 */
router.put('/:userId', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    const { teacherData, userData } = req.body;
    
    if (!teacherData && !userData) {
      return handleError(res, 400, 'No update data provided');
    }
    
    const result = await withTransaction(async (session) => {
      // First find the teacher by user ID
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Update the teacher profile
      if (teacherData) {
        // Protect critical statistics from direct updates
        const protectedFields = ['averageRating', 'totalRatings', 'totalStudents', 'coursesCreated', 'responseTimeAverage'];
        
        Object.keys(teacherData).forEach(key => {
          // Skip protected fields that should only be updated through specific endpoints
          if (!protectedFields.includes(key)) {
            teacher[key] = teacherData[key];
          }
        });
        
        await teacher.save({ session });
      }
      
      // If user data is provided, update the user as well
      if (userData) {
        const user = await User.findById(req.params.userId).session(session);
        
        if (!user) {
          throw createError(404, 'User not found');
        }
        
        // Update allowed user fields
        const allowedUserFields = ['fullName', 'phoneNumber', 'address', 
          'bio', 'profilePicture', 'socialLinks', 'dateOfBirth', 'gender'];
        
        allowedUserFields.forEach(field => {
          if (userData[field] !== undefined) {
            user[field] = userData[field];
          }
        });
        
        await user.save({ session });
      }
      
      // Return the updated teacher with populated user information
      return Teacher.findById(teacher._id).populate('user').lean();
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error updating teacher profile: ' + error.message));
  }
});

/**
 * DELETE /teachers/:userId
 * Delete a teacher profile and optionally deactivate the associated user
 */
router.delete('/:userId', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    await withTransaction(async (session) => {
      const { deleteUser } = req.query;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Delete the teacher profile
      await Teacher.findByIdAndDelete(teacher._id, { session });
      
      if (deleteUser === 'true') {
        // Hard delete the user
        const deleteResult = await User.findByIdAndDelete(req.params.userId, { session });
        if (!deleteResult) {
          throw createError(404, 'User not found');
        }
      } else {
        // Soft delete by marking user as inactive and changing role back to User
        const updateResult = await User.findByIdAndUpdate(
          req.params.userId,
          { 
            isActive: false,
            role: 'User' // Change role back to regular user
          },
          { session, new: true }
        );
        
        if (!updateResult) {
          throw createError(404, 'User not found');
        }
      }
    });
    
    res.json({ 
      success: true, 
      message: `Teacher profile ${req.query.deleteUser === 'true' ? 'and user account' : ''} successfully deleted` 
    });
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error deleting teacher profile: ' + error.message));
  }
});

/**
 * POST /teachers/:userId/verification
 * Add verification document to teacher profile
 */
router.post('/:userId/verification', validateRequest([
  check('documentType').notEmpty().withMessage('Document type is required'),
  check('documentURL').isURL().withMessage('Valid document URL is required')
]), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    const result = await withTransaction(async (session) => {
      const { documentType, documentURL } = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Add new verification document
      teacher.verificationDocuments.push({
        documentType,
        documentURL,
        uploadDate: new Date(),
        verificationStatus: 'Pending'
      });
      
      await teacher.save({ session });
      
      // Return updated teacher
      return teacher;
    });
    
    res.status(201).json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error adding verification document: ' + error.message));
  }
});

/**
 * PUT /teachers/:userId/verification/:documentId
 * Update verification status of a document
 */
router.put('/:userId/verification/:documentId', validateRequest([
  check('status').isIn(['Pending', 'Verified', 'Rejected']).withMessage('Invalid verification status')
]), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId) || 
        !mongoose.Types.ObjectId.isValid(req.params.documentId)) {
      return handleError(res, 400, 'Invalid ID format');
    }
    
    const result = await withTransaction(async (session) => {
      const { status, adminComments } = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Find the document and update its status
      const docIndex = teacher.verificationDocuments.findIndex(doc => 
        doc._id.toString() === req.params.documentId
      );
      
      if (docIndex === -1) {
        throw createError(404, 'Verification document not found');
      }
      
      // Update document status and add admin comments if provided
      teacher.verificationDocuments[docIndex].verificationStatus = status;
      if (adminComments) {
        teacher.verificationDocuments[docIndex].adminComments = adminComments;
      }
      
      // Update the verification date
      teacher.verificationDocuments[docIndex].verificationDate = new Date();
      
      // If all documents are verified, mark the teacher as verified
      if (status === 'Verified' && 
          teacher.verificationDocuments.every(doc => doc.verificationStatus === 'Verified')) {
        teacher.isVerified = true;
      } else if (status === 'Rejected') {
        // If any document is rejected, mark the teacher as not verified
        teacher.isVerified = false;
      }
      
      await teacher.save({ session });
      
      // Return updated teacher
      return teacher;
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error updating verification status: ' + error.message));
  }
});

/**
 * PUT /teachers/:userId/payment
 * Update teacher payment information
 */
router.put('/:userId/payment', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return handleError(res, 400, 'Payment details are required');
    }
    
    const result = await withTransaction(async (session) => {
      const paymentDetails = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Update payment details
      teacher.paymentDetails = {
        ...teacher.paymentDetails,
        ...paymentDetails,
        lastUpdated: new Date()
      };
      
      await teacher.save({ session });
      
      // Return updated teacher
      return teacher;
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error updating payment information: ' + error.message));
  }
});

/**
 * POST /teachers/:userId/rating
 * Add a new rating to a teacher and update averages
 */
router.post('/:userId/rating', validateRequest([
  check('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
]), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    if (req.body.reviewId && !mongoose.Types.ObjectId.isValid(req.body.reviewId)) {
      return handleError(res, 400, 'Invalid review ID format');
    }
    
    const result = await withTransaction(async (session) => {
      const { rating, reviewId } = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Calculate new average rating
      const currentTotalScore = teacher.averageRating * teacher.totalRatings;
      const newTotalRatings = teacher.totalRatings + 1;
      const newAverageRating = (currentTotalScore + rating) / newTotalRatings;
      
      // Update teacher with new rating stats
      teacher.totalRatings = newTotalRatings;
      teacher.averageRating = parseFloat(newAverageRating.toFixed(2));
      
      // If a review ID is provided, add it to the teacher's reviews array
      if (reviewId) {
        if (!teacher.reviews) {
          teacher.reviews = [];
        }
        
        if (!teacher.reviews.includes(reviewId)) {
          teacher.reviews.push(reviewId);
        }
      }
      
      await teacher.save({ session });
      
      return {
        success: true,
        averageRating: teacher.averageRating,
        totalRatings: teacher.totalRatings
      };
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error adding rating: ' + error.message));
  }
});

/**
 * POST /teachers/:userId/course
 * Add a new course to a teacher
 */
router.post('/:userId/course', validateRequest([
  check('courseId').notEmpty().withMessage('Course ID is required')
]), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
      return handleError(res, 400, 'Invalid course ID format');
    }
    
    const result = await withTransaction(async (session) => {
      const { courseId } = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Add course to teacher's courses array if not already there
      if (!teacher.courses) {
        teacher.courses = [];
      }
      
      if (!teacher.courses.includes(courseId)) {
        teacher.courses.push(courseId);
        teacher.coursesCreated = teacher.courses.length;
      } else {
        throw createError(400, 'Course already added to teacher profile');
      }
      
      await teacher.save({ session });
      
      return {
        success: true,
        coursesCreated: teacher.coursesCreated
      };
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error adding course: ' + error.message));
  }
});

/**
 * PUT /teachers/:userId/students
 * Update total students count for a teacher
 */
router.put('/:userId/students', validateRequest([
  check('totalStudents').isInt({ min: 0 }).withMessage('Valid totalStudents count is required')
]), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    const result = await withTransaction(async (session) => {
      const { totalStudents } = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // Update total students count
      teacher.totalStudents = totalStudents;
      
      await teacher.save({ session });
      
      return {
        success: true,
        totalStudents: teacher.totalStudents
      };
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error updating student count: ' + error.message));
  }
});

/**
 * PUT /teachers/:userId/response-time
 * Update teacher's average response time
 */
router.put('/:userId/response-time', validateRequest([
  check('responseTime').isFloat({ min: 0 }).withMessage('Valid responseTime is required (in minutes)')
]), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    const result = await withTransaction(async (session) => {
      const { responseTime } = req.body;
      const teacher = await Teacher.findOne({ user: req.params.userId }).session(session);
      
      if (!teacher) {
        throw createError(404, 'Teacher profile not found');
      }
      
      // If this is the first response time entry
      if (!teacher.responseTimeAverage || teacher.responseTimeAverage === 0) {
        teacher.responseTimeAverage = responseTime;
      } else {
        // Calculate new weighted average (giving more weight to recent times)
        // Using 80% weight for the new response time and 20% for the historical average
        const weightedAverage = (responseTime * 0.8) + (teacher.responseTimeAverage * 0.2);
        teacher.responseTimeAverage = parseFloat(weightedAverage.toFixed(2));
      }
      
      await teacher.save({ session });
      
      return {
        success: true,
        responseTimeAverage: teacher.responseTimeAverage
      };
    });
    
    res.json(result);
  } catch (error) {
    if (error.status) {
      return handleError(res, error.status, error.message);
    }
    next(createError(500, 'Error updating response time: ' + error.message));
  }
});

/**
 * GET /teachers/search/:query
 * Search for teachers by name or expertise
 */
router.get('/search/:query', async (req, res, next) => {
  try {
    const { query } = req.params;
    
    if (!query || query.trim().length < 2) {
      return handleError(res, 400, 'Search query must be at least 2 characters long');
    }
    
    // Use Promise.all to run queries in parallel
    const [users, teachersByExpertise] = await Promise.all([
      // First search in user collection for name matches
      User.find(
        { 
          $text: { $search: query },
          role: 'Teacher'
        },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } }).lean(),
      
      // Then search in teacher collection for expertise matches
      Teacher.find({
        $or: [
          { areasOfExpertise: { $regex: query, $options: 'i' } },
          { specialization: { $regex: query, $options: 'i' } }
        ]
      }).populate('user', 'fullName email profilePicture').lean()
    ]);
    
    const userIds = users.map(user => user._id);
    
    // Get teachers by user IDs
    const teachersByUser = await Teacher.find({
      user: { $in: userIds }
    }).populate('user', 'fullName email profilePicture').lean();
    
    // Combine and remove duplicates
    const combinedTeachers = [...teachersByExpertise];
    
    teachersByUser.forEach(teacher => {
      if (!combinedTeachers.some(t => t._id.toString() === teacher._id.toString())) {
        combinedTeachers.push(teacher);
      }
    });
    
    res.json(combinedTeachers);
  } catch (error) {
    next(createError(500, 'Error searching teachers: ' + error.message));
  }
});

/**
 * GET /teachers/:userId/stats
 * Get teacher statistics
 */
router.get('/:userId/stats', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return handleError(res, 400, 'Invalid user ID format');
    }
    
    const teacher = await Teacher.findOne({ user: req.params.userId }).lean();
    
    if (!teacher) {
      return handleError(res, 404, 'Teacher profile not found');
    }
    
    // Calculate additional statistics if needed
    const stats = {
      coursesCreated: teacher.coursesCreated || 0,
      totalStudents: teacher.totalStudents || 0,
      averageRating: teacher.averageRating || 0,
      totalRatings: teacher.totalRatings || 0, 
      responseTimeAverage: teacher.responseTimeAverage || 0,
      isVerified: teacher.isVerified || false,
      joinedDate: teacher.createdAt,
      completionRate: teacher.completionRate || 0
    };
    
    res.json(stats);
  } catch (error) {
    next(createError(500, 'Error retrieving teacher statistics: ' + error.message));
  }
});

module.exports = router;