const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // INFO NECESSARY AT SIGNUP
  // created at signup
  userId: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9)
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  // NECESAARY : cannot sign-up without it (required but with a default value to prevent validation errors)
  role: { type: String, enum: ['Student', 'Teacher'], required: true },
  
  // info that can be added later ---> optional 
  // Social Links - available to both students and teachers
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  bio: {type: String},
  profilePicture: {type: String},
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
    instagram: { type: String },
    github: { type: String },
    youtube: { type: String },
    facebook: { type: String }
  }
}, { timestamps: true });

// Create appropriate indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ userId: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ fullName: 'text' }); // Enable text search on name

module.exports = mongoose.model('User', UserSchema);