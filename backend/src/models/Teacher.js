const mongoose = require('mongoose');
const { Schema } = mongoose;

// Current year for validation
const currentYear = new Date().getFullYear();

const TeacherSchema = new Schema({
    // INFO NEEDED AT SIGNUP 
    // Core User Connection
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Fields from Signup Form
    specialization: { 
        type: String, 
        enum: [
          'Mathematics', 
          'Science', 
          'English', 
          'History', 
          'Computer Science', 
          'Arts', 
          'Physical Education', 
          'Other'
        ], 
        required: true
    },
    teachingExperience: { 
        type: String, 
        enum: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'], 
        required: true
    },
    // Simplified qualifications field
    qualifications: {
        /*
        type: [{
            degree: String,
            institution: String,
            year: Number,
            fieldOfStudy: String
        }],*/
        type: [String],
        required: true,
        validate: [arr => arr.length > 0, 'At least one qualification is required']
    },
    
    // Rest of the schema...
    // Professional Information
    professionalTitle: { type: String, trim: true },
    areasOfExpertise: [{ type: String, trim: true }],
    currentInstitution: { type: String, trim: true },
    previousInstitutions: [{ type: String, trim: true }],
    department: { type: String, trim: true },
    
    // Teaching Profile Settings
    profileVisibility: { 
        type: String, 
        enum: ['Public', 'Students Only', 'Private'], 
        default: 'Public' 
    },
    
    // Teaching Materials & Resources
    teachingMethodology: [{ type: String, trim: true }],  
    teachingStyle: { type: String, trim: true },
    
    // Verification & Credentials
    isVerified: { type: Boolean, default: false },
    verificationDocuments: [{
        documentType: String,
        documentURL: String,
        uploadDate: { type: Date, default: Date.now },
        verificationStatus: { 
            type: String, 
            enum: ['Pending', 'Verified', 'Rejected'], 
            default: 'Pending' 
        }
    }],
    
    // Payment Information
    paymentDetails: {
        accountHolder: String,
        bankName: String,
        accountNumber: String,
        routingNumber: String,
        paymentMethod: { 
            type: String, 
            enum: ['Bank Transfer', 'PayPal', 'Direct Deposit'] 
        }, 
        payoutFreq: {
            type: String, 
            enum: ['Monthly', 'Bi-Monthly', 'Weekly']
        }, 
        payoutAmount: { type: Number, min: 0 }, 
        taxInfo: String
    },
    
    // Reviews & Ratings
    averageRating: { type: Number, min: 0, max: 5, default: 0 },
    totalRatings: { type: Number, min: 0, default: 0 },
    
    // Course Statistics
    coursesCreated: { type: Number, default: 0, min: 0 },
    totalStudents: { type: Number, default: 0, min: 0 },
    
    // Communication Preferences
    contactPreference: { 
        type: String, 
        enum: ['Email', 'Discussion Forums', 'Both'], 
        default: 'Discussion Forums'
    },
    responseTimeAverage: { type: Number, min: 0, default: 24 }
    
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create appropriate indexes
TeacherSchema.index({ user: 1 }, { unique: true });
TeacherSchema.index({ specialization: 1 });
TeacherSchema.index({ teachingExperience: 1 });
TeacherSchema.index({ "qualifications.fieldOfStudy": 1 });
TeacherSchema.index({ averageRating: -1 }); // For finding top-rated teachers

// Virtual fields for relationship with other collections
TeacherSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'teacher'
});

TeacherSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'teacher'
});

// Method to recalculate average rating
TeacherSchema.methods.recalculateRating = async function() {
    const Review = mongoose.model('Review');
    const reviews = await Review.find({ teacher: this._id });
    
    if (reviews.length === 0) {
        this.averageRating = 0;
        this.totalRatings = 0;
    } else {
        const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalScore / reviews.length;
        this.totalRatings = reviews.length;
    }
    
    return this.save();
};

module.exports = mongoose.model('Teacher', TeacherSchema);