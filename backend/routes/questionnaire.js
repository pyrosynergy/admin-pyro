const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');
const { sendThankYouMail } = require('../utils/mailer');

// @route   POST /api/questionnaire/submit
// @desc    Submit questionnaire response
// @access  Public
router.post('/submit', async (req, res) => {
  try {
    const {
      name,
      businessStage,
      businessStageOther,
      businessChallenge,
      revenueSatisfaction,
      successVision,
      hiringConcern,
      hiringConcernOther,
      visionAlignment,
      onepartnerAppeal,
      improvementTimeline,
      email,
      // Total scores
      totalScore,
      totalMaxScore,
      totalPercentage,
      // MCQ scores
      mcqScore,
      mcqMaxScore,
      mcqPercentage,
      // Descriptive scores
      descriptiveScore,
      descriptiveMaxScore,
      descriptivePercentage,
      // Score band
      scoreBand,
      scoreLabel
    } = req.body;

    // Basic validation
    if (!name||!businessStage || !businessChallenge || !revenueSatisfaction || 
        !successVision || !hiringConcern || !visionAlignment || 
        !onepartnerAppeal || !improvementTimeline || !email) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Get client IP
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

    // Create new questionnaire response with ALL scoring data
    const questionnaireResponse = new Questionnaire({
      name,
      businessStage,
      businessStageOther,
      businessChallenge,
      revenueSatisfaction,
      successVision,
      hiringConcern,
      hiringConcernOther,
      visionAlignment,
      onepartnerAppeal,
      improvementTimeline,
      email,
      // Total scores
      totalScore: totalScore || 0,
      totalMaxScore: totalMaxScore || 0,
      totalPercentage: totalPercentage || 0,
      // MCQ scores
      mcqScore: mcqScore || 0,
      mcqMaxScore: mcqMaxScore || 0,
      mcqPercentage: mcqPercentage || 0,
      // Descriptive scores
      descriptiveScore: descriptiveScore || 0,
      descriptiveMaxScore: descriptiveMaxScore || 0,
      descriptivePercentage: descriptivePercentage || 0,
      // Score band
      scoreBand: scoreBand || 'red',
      scoreLabel: scoreLabel || '',
      ipAddress
    });

    // Save to database
    await questionnaireResponse.save();

    // Send thank you email BEFORE responding.
    // On Vercel Serverless, any async work that isn't awaited can be terminated when the response is sent.
    try {
      const mailResult = await sendThankYouMail(email, name);
      console.log(`Thank you email sent successfully to ${email}`);
      console.log('Email result:', mailResult);
    } catch (error) {
      // Don't fail the submission if email fails; just log it for observability
      console.error('Email sending failed:', error);
      console.error('Error details:', error?.message);
    }
    console.log(email);

    res.status(201).json({
      success: true,
      message: 'Questionnaire submitted successfully',
      data: {
        id: questionnaireResponse._id,
        submittedAt: questionnaireResponse.submittedAt,
        score: {
          totalScore: questionnaireResponse.totalScore,
          totalPercentage: questionnaireResponse.totalPercentage,
          mcqScore: questionnaireResponse.mcqScore,
          mcqPercentage: questionnaireResponse.mcqPercentage,
          descriptiveScore: questionnaireResponse.descriptiveScore,
          descriptivePercentage: questionnaireResponse.descriptivePercentage,
          scoreBand: questionnaireResponse.scoreBand,
          scoreLabel: questionnaireResponse.scoreLabel
        }
      }
    });

  } catch (error) {
    console.error('Error submitting questionnaire:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email has already been used for a submission'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   GET /api/questionnaire/responses
// @desc    Get all questionnaire responses (for admin)
// @access  Public (you can add auth later)
router.get('/responses', async (req, res) => {
  try {
    const responses = await Questionnaire.find()
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;