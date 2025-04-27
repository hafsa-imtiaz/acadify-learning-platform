const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // Core User Connection
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Basic Profile (collected at signup)
  displayName: { type: String }, // Can be different from full name in User model
  field: { type: String }, // The student's field of study/interest
  occupation: { type: String },
  
  // Profile Settings
  profileVisibility: { type: String, enum: ['Public', 'Enrolled Only', 'Private'], default: 'Public' },
  timezone: { type: String },
  language: { type: String, default: 'English' },
  
  // Learning Information
  learningGoals: [String],
  interests: [String],
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  
  // Learning Preferences
  learningPace: { type: String, enum: ['Self-paced', 'Structured'] },
  preferredContentTypes: [{ 
    type: String, 
    enum: ['Video', 'Reading', 'Interactive', 'Quiz', 'Discussion'] 
  }],
  
  // Optional Institute Information
  institute: { type: String },
  
  // Payment Information for purchased courses
  paymentMethods: [{
    type: { type: String, enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Other'] },
    lastFour: String, // Last four digits of card or account
    expiryDate: String, // For credit cards
    isDefault: { type: Boolean, default: false }
  }],
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create appropriate indexes
StudentSchema.index({ user: 1 }, { unique: true });
StudentSchema.index({ field: 1 });

module.exports = mongoose.model('Student', StudentSchema);