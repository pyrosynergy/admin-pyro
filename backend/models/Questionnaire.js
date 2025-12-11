const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  businessStage: {
    type: String,
    required: true
  },
  businessStageOther: {
    type: String,
    default: ''
  },
  businessChallenge: {
    type: String,
    required: true
  },
  revenueSatisfaction: {
    type: String,
    required: true
  },
  successVision: {
    type: String,
    required: true
  },
  hiringConcern: {
    type: String,
    required: true
  },
  hiringConcernOther: {
    type: String,
    default: ''
  },
  visionAlignment: {
    type: String,
    required: true
  },
  onepartnerAppeal: {
    type: String,
    required: true
  },
  improvementTimeline: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  // Total scoring fields
  totalScore: {
    type: Number,
    default: 0
  },
  totalMaxScore: {
    type: Number,
    default: 0
  },
  totalPercentage: {
    type: Number,
    default: 0
  },
  // MCQ scoring fields
  mcqScore: {
    type: Number,
    default: 0
  },
  mcqMaxScore: {
    type: Number,
    default: 0
  },
  mcqPercentage: {
    type: Number,
    default: 0
  },
  // Descriptive scoring fields
  descriptiveScore: {
    type: Number,
    default: 0
  },
  descriptiveMaxScore: {
    type: Number,
    default: 0
  },
  descriptivePercentage: {
    type: Number,
    default: 0
  },
  scoreBand: {
    type: String,
    enum: ['red', 'yellow', 'green'],
    default: 'red'
  },
  scoreLabel: {
    type: String,
    default: ''
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster email queries
questionnaireSchema.index({ email: 1 });
questionnaireSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Questionnaire', questionnaireSchema);