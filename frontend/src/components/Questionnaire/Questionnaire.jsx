import React, { useState, useEffect } from 'react';
import './Questionnaire.css';
import { sendThankYouMail } from '../../utils/mailer';

// Utility function to detect mobile devices
const isMobileDevice = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
};

// Add this function at the top after imports
const submitToBackend = async (formData) => {
  try {
    // Use environment-based URL
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://admin-pyro-backend-git-dev-pyrosynergys-projects.vercel.app/'
      : 'http://localhost:5000';
    
    console.log('Submitting to:', API_BASE_URL);
    console.log('Environment:', process.env.NODE_ENV);
    
    const response = await fetch(`${API_BASE_URL}/api/questionnaire/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Add credentials for CORS
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit questionnaire');
    }

    return result;
  } catch (error) {
    console.error('Error submitting questionnaire:', error);
    throw error;
  }
};

// Frontend-only submission function with email
const submitQuestionnaire = async (formData) => {
  try {
    console.log('🚀 Starting questionnaire submission process...');
    console.log('📊 Form Data:', {
      name: formData.name,
      email: formData.email,
      businessStage: formData.businessStage,
      totalScore: formData.totalScore,
      totalPercentage: formData.totalPercentage,
      scoreBand: formData.scoreBand
    });
    
    console.log('📧 About to send email...');
    console.log('   - Recipient:', formData.email);
    console.log('   - Name:', formData.name);
    
    // Send email directly from frontend
    const emailResult = await sendThankYouMail(formData.email, formData.name, formData);
    
    console.log('✅ Email sending completed successfully!');
    console.log('📊 Email Result:', emailResult);
    
    // You can optionally still save to backend without email functionality
    // Or remove backend submission entirely if not needed
    
    console.log('✅ Questionnaire submission completed successfully!');
    return { success: true, message: 'Questionnaire submitted and email sent successfully' };
    
  } catch (error) {
    console.error('❌ Error in questionnaire submission:');
    console.error('   - Error:', error);
    console.error('   - Error message:', error.message);
    console.error('   - Error stack:', error.stack);
    throw error;
  }
};

// ThemeAlert component
const ThemeAlert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="alert-message">{message}</p>
        <button onClick={onClose} className="alert-close-button">
          OK
        </button>
      </div>
    </div>
  );
};

// Loading component
const LoadingScreen = ({ progress }) => {
  return (
    <div className="loading-container">
      <div className="loading-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="loading-visual">
        <div className="loading-ring"></div>
        <div className="loading-inner">
          <div className="loading-percentage">{progress}%</div>
        </div>
      </div>
      
      <h2 className="loading-title">Calculating Your Score</h2>
      <p className="loading-subtitle">
        Analyzing your responses and generating personalized insights...
      </p>
      
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

// Main questionnaire component
const Questionnaire = () => {
  // FIXED: Clean state declarations
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [cameFromAnalytics, setCameFromAnalytics] = useState(false); // Add this new state
  const [formData, setFormData] = useState({
    name: '', // Add name field
    businessStage: '',
    businessStageOther: '',
    businessChallenge: '',
    revenueSatisfaction: '',
    successVision: '',
    hiringConcern: '',
    hiringConcernOther: '',
    visionAlignment: '',
    onepartnerAppeal: '',
    improvementTimeline: '',
    email: ''
  });
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const questions = [
    {
      id: 'businessStage',
      type: 'button-select',
      question: 'What stage best describes your business?',
      required: true,
      scoring: {
        maxPoints: 8,
        weights: {
          'just-starting': 2,
          'established-offline': 8,
          'online-struggling': 6,
          'growing-well': 8,
          'other': 4
        }
      },
      options: [
        { value: 'just-starting', label: 'Just starting out (0-6 months)' },
        { value: 'established-offline', label: 'Established offline, exploring online' },
        { value: 'online-struggling', label: 'Online but struggling with growth' },
        { value: 'growing-well', label: 'Growing well, seeking optimization' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'businessChallenge',
      type: 'tag-select',
      question: 'What\'s your #1 business challenge right now?',
      placeholder: 'Select challenges that apply to you or add your own',
      required: true,
      scoring: {
        maxPoints: 3,
        // Scoring logic will be handled in calculateDescriptiveScore function
      },
      predefinedTags: [
        'Not enough customers',
        'Cash flow issues',
        'Too many manual processes',
        'Marketing not working',
        'Competition pressure',
        'Team management'
      ]
    },
    {
      id: 'revenueSatisfaction',
      type: 'scale',
      question: 'How satisfied are you with your current monthly revenue?',
      required: true,
      scoring: {
        maxPoints: 12,
        weights: {
          '1': 0,
          '2': 3,
          '3': 6,
          '4': 9,
          '5': 12
        }
      },
      scaleLabels: {
        1: 'Very unsatisfied',
        5: 'Very satisfied'
      }
    },
    {
      id: 'successVision',
      type: 'tag-select',
      question: 'What would a successful next 12 months look like for you?',
      placeholder: 'Select goals that resonate or add your own vision',
      required: true,
      scoring: {
        maxPoints: 3,
        // Scoring logic will be handled in calculateDescriptiveScore function
      },
      predefinedTags: [
        'Double customer base',
        'Streamline operations',
        'Increase revenue by 50%',
        'Build strong team',
        'Expand to new markets',
        'Achieve work-life balance'
      ]
    },
    {
      id: 'hiringConcern',
      type: 'button-select',
      question: 'What\'s your biggest concern about seeking outside help?',
      required: true,
      scoring: {
        maxPoints: 8,
        weights: {
          'cost-budget': 4,
          'not-sure-needs': 6,
          'quality-results': 8,
          'trust-communication': 6,
          'no-concerns': 8,
          'other': 4
        }
      },
      options: [
        { value: 'cost-budget', label: 'Cost/budget constraints' },
        { value: 'not-sure-needs', label: 'Not sure what I actually need' },
        { value: 'quality-results', label: 'Worried about quality/results' },
        { value: 'trust-communication', label: 'Trust and communication issues' },
        { value: 'no-concerns', label: 'No major concerns' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'visionAlignment',
      type: 'button-select',
      question: 'Does your current business operations match your original vision?',
      required: true,
      scoring: {
        maxPoints: 8,
        weights: {
          'mostly-aligned': 8,
          'somewhat-aligned': 6,
          'not-really': 4,
          'completely-different': 2
        }
      },
      options: [
        { value: 'mostly-aligned', label: 'Yes, mostly aligned' },
        { value: 'somewhat-aligned', label: 'Somewhat aligned' },
        { value: 'not-really', label: 'Not really aligned' },
        { value: 'completely-different', label: 'Completely different from vision' }
      ]
    },
    {
      id: 'onepartnerAppeal',
      type: 'button-select',
      question: 'How appealing is having one partner handle multiple business needs?',
      required: true,
      scoring: {
        maxPoints: 10,
        weights: {
          'very-appealing': 10,
          'somewhat-appealing': 7,
          'not-appealing': 3,
          'unsure': 5
        }
      },
      options: [
        { value: 'very-appealing', label: 'Very appealing - I prefer one-stop solutions' },
        { value: 'somewhat-appealing', label: 'Somewhat appealing - depends on the needs' },
        { value: 'not-appealing', label: 'Not appealing - I prefer specialists' },
        { value: 'unsure', label: 'Unsure' }
      ]
    },
    {
      id: 'improvementTimeline',
      type: 'button-select',
      question: 'When do you want to start making improvements?',
      required: true,
      scoring: {
        maxPoints: 10,
        weights: {
          'right-away': 10,
          'soon': 8,
          'later-this-year': 6,
          'next-year': 3,
          'just-exploring': 2
        }
      },
      options: [
        { value: 'right-away', label: 'Right away (within 1 month)' },
        { value: 'soon', label: 'Soon (1-3 months)' },
        { value: 'later-this-year', label: 'Later this year (3-6 months)' },
        { value: 'next-year', label: 'Next year or later' },
        { value: 'just-exploring', label: 'Just exploring options' }
      ]
    },
    {
      id: 'email',
      type: 'email',
      question: 'What\'s the best email to send your personalized business insights?',
      placeholder: 'Enter your email address',
      required: true
    }
  ];

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  const handleInputChange = (value) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleOtherTextChange = (value) => {
    const otherFieldId = currentQuestion.id + 'Other';
    setFormData(prev => ({
      ...prev,
      [otherFieldId]: value
    }));
  };
  const handleStartWithName = () => {
    if (!formData.name || formData.name.trim() === '') {
      setAlertMessage('Please enter your name to continue.');
      setIsAlertVisible(true);
      return;
    }
    setCurrentStep(0);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const value = formData[currentQuestion.id] || '';
    
    if (currentQuestion.required && (!value || value.trim() === '')) {
      setAlertMessage('This question is required. Please provide an answer.');
      setIsAlertVisible(true);
      return;
    }
    
    if (currentQuestion.type === 'button-select' && value === 'other') {
      const otherValue = formData[currentQuestion.id + 'Other'] || '';
      if (!otherValue || otherValue.trim() === '') {
        setAlertMessage('Please specify your answer for "Other".');
        setIsAlertVisible(true);
        return;
      }
    }
    
    // If we just finished question 8 (improvementTimeline), show loading then analytics
    if (currentQuestion.id === 'improvementTimeline') {
      setIsCalculating(true);
      
      // Animate the progress from 0 to 100
      const animateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5; // Random increment between 5-20
          if (progress >= 100) {
            progress = 100;
            setLoadingProgress(progress);
            clearInterval(interval);
            
            // Wait a moment at 100% then show analytics
            setTimeout(() => {
              setIsCalculating(false);
              setLoadingProgress(0);
              setShowAnalytics(true);
            }, 800);
          } else {
            setLoadingProgress(Math.floor(progress));
          }
        }, 200); // Update every 200ms
      };
      
      // Start the animation after a brief delay
      setTimeout(animateProgress, 300);
      return;
    }
    
    // If we're on the last question (email), submit the form
    if (isLastQuestion) {
      try {
        const totalScoreData = calculateTotalScore(formData);
        const scoreBand = getScoreBand(totalScoreData.totalPercentage);
        
        const submissionData = {
          ...formData,
          // Total scores
          totalScore: totalScoreData.totalScore,
          totalMaxScore: totalScoreData.totalMaxScore,
          totalPercentage: totalScoreData.totalPercentage,
          // MCQ scores
          mcqScore: totalScoreData.mcqScore.score,
          mcqMaxScore: totalScoreData.mcqScore.maxScore,
          mcqPercentage: totalScoreData.mcqScore.percentage,
          // Descriptive scores
          descriptiveScore: totalScoreData.descriptiveScore.score,
          descriptiveMaxScore: totalScoreData.descriptiveScore.maxScore,
          descriptivePercentage: totalScoreData.descriptiveScore.percentage,
          // Score band
          scoreBand: scoreBand.zone,
          scoreLabel: scoreBand.label
        };

        await submitQuestionnaire(submissionData);
        setAlertMessage(`Thank you! Your personalized business insights are on their way to ${formData.email}!`);
        setIsAlertVisible(true);
        
        // Reset form and return to welcome
        setFormData({
          name: '', // Add name to reset
          businessStage: '',
          businessStageOther: '',
          businessChallenge: '',
          revenueSatisfaction: '',
          successVision: '',
          hiringConcern: '',
          hiringConcernOther: '',
          visionAlignment: '',
          onepartnerAppeal: '',
          improvementTimeline: '',
          email: ''
        });
        setCurrentStep(-1);
        setShowAnalytics(false);
      } catch (error) {
        setAlertMessage("Sorry, there was an error. Please try again.");
        setIsAlertVisible(true);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Function to continue from analytics to email
  const handleContinueFromAnalytics = () => {
    setShowAnalytics(false);
    setCameFromAnalytics(true); // Mark that we came from analytics
    setCurrentStep(questions.length - 1); // Go to email question
  };

  const handlePrevious = () => {
    // If we're on the email question and came from analytics, go back to analytics
    if (isLastQuestion && cameFromAnalytics) {
      setCameFromAnalytics(false);
      setShowAnalytics(true);
      return;
    }
    
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // THIS FUNCTION'S FORMATTING IS NOW PRESERVED
  const renderInput = () => {
    const value = formData[currentQuestion.id] || '';
    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="question-input"
            autoFocus={!isMobileDevice()}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="question-input"
            autoFocus={!isMobileDevice()}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className="question-select"
            autoFocus={!isMobileDevice()}
          >
            {currentQuestion.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'button-select':
        const hasOtherOption = currentQuestion.options.some(option => option.value === 'other');
        const showOtherInput = hasOtherOption && value === 'other';
        const otherFieldId = currentQuestion.id + 'Other';
        return (
          <div className="button-select-container">
            <div className="button-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange(option.value)}
                  className={`option-button ${value === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {showOtherInput && (
              <div className="other-input-container">
                <input
                  type="text"
                  value={formData[otherFieldId] || ''}
                  onChange={(e) => handleOtherTextChange(e.target.value)}
                  placeholder="Please specify..."
                  className="other-input"
                  autoFocus={!isMobileDevice()}
                />
              </div>
            )}
          </div>
        );
      case 'scale':
        return (
          <div className="scale-container">
            <div className="scale-labels">
              <span className="scale-label-left">{currentQuestion.scaleLabels[1]}</span>
              <span className="scale-label-right">{currentQuestion.scaleLabels[5]}</span>
            </div>
            <div className="scale-options">
              {[1, 2, 3, 4, 5].map((scaleValue) => (
                <label key={scaleValue} className="scale-option">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={scaleValue}
                    checked={value == scaleValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                  <span className="scale-number">{scaleValue}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'tag-select':
        const selectedTags = value ? value.split(',').filter(tag => tag.trim()) : [];
        return (
          <div className="tag-select-container">
            <div className="predefined-tags">
              {currentQuestion.predefinedTags.map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <span className="tag-remove">×</span>
                  )}
                </button>
              ))}
            </div>
            <div className="selected-tags">
              {selectedTags.map((tag, index) => (
                !currentQuestion.predefinedTags.includes(tag) && (
                  <div key={index} className="custom-tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="tag-remove-btn"
                    >
                      ×
                    </button>
                  </div>
                )
              ))}
            </div>
            <input
              type="text"
              placeholder={currentQuestion.placeholder}
              className="tag-input"
              onKeyPress={(e) => handleTagInput(e)}
              autoFocus={!isMobileDevice()}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleTagToggle = (tag) => {
    const currentValue = formData[currentQuestion.id] || '';
    const selectedTags = currentValue ? currentValue.split(',').filter(t => t.trim()) : [];
    if (selectedTags.includes(tag)) {
      // Remove tag
      const newTags = selectedTags.filter(t => t !== tag);
      setFormData(prev => ({
        ...prev,
        [currentQuestion.id]: newTags.join(',')
      }));
    } else {
      // Add tag
      const newTags = [...selectedTags, tag];
      setFormData(prev => ({
        ...prev,
        [currentQuestion.id]: newTags.join(',')
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const currentValue = formData[currentQuestion.id] || '';
    const selectedTags = currentValue ? currentValue.split(',').filter(t => t.trim()) : [];
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: newTags.join(',')
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      const currentValue = formData[currentQuestion.id] || '';
      const selectedTags = currentValue ? currentValue.split(',').filter(t => t.trim()) : [];
      if (!selectedTags.includes(newTag)) {
        const newTags = [...selectedTags, newTag];
        setFormData(prev => ({
          ...prev,
          [currentQuestion.id]: newTags.join(',')
        }));
      }
      e.target.value = '';
    }
  };

  // Update the existing calculateMCQScore function
  const calculateMCQScore = (formData) => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    questions.forEach(question => {
      // Only calculate MCQ scores (exclude tag-select questions)
      if (question.scoring && question.type !== 'tag-select' && formData[question.id]) {
        const userAnswer = formData[question.id];
        const questionScore = question.scoring.weights[userAnswer] || 0;
        
        totalScore += questionScore;
        maxPossibleScore += question.scoring.maxPoints;
      }
    });

    return {
      score: totalScore,
      maxScore: maxPossibleScore,
      percentage: maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0
    };
  };

  // Add new function to calculate total combined score
  const calculateTotalScore = (formData) => {
    const mcqScore = calculateMCQScore(formData);
    const descriptiveScore = calculateDescriptiveScore(formData);
    
    const totalScore = mcqScore.score + descriptiveScore.score;
    const totalMaxScore = mcqScore.maxScore + descriptiveScore.maxScore;
    const totalPercentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
    
    return {
      totalScore,
      totalMaxScore,
      totalPercentage,
      mcqScore,
      descriptiveScore
    };
  };

  // Add this new function after calculateMCQScore
  const calculateDescriptiveScore = (formData) => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    const descriptiveQuestions = ['businessChallenge', 'successVision'];
    
    descriptiveQuestions.forEach(questionId => {
      const userAnswer = formData[questionId] || '';
      const selectedTags = userAnswer ? userAnswer.split(',').filter(tag => tag.trim()) : [];
      
      // Find the question definition to get predefined tags
      const questionDef = questions.find(q => q.id === questionId);
      if (!questionDef || !questionDef.predefinedTags) return;
      
      let questionScore = 0;
      const maxQuestionScore = 3;
      
      // Check for predefined tags (1 point)
      const hasPredefinedTag = selectedTags.some(tag => 
        questionDef.predefinedTags.includes(tag)
      );
      
      // Check for custom descriptions (2 points)
      const hasCustomDescription = selectedTags.some(tag => 
        !questionDef.predefinedTags.includes(tag) && tag.trim().length > 0
      );
      
      // Calculate score based on combination
      if (hasPredefinedTag && hasCustomDescription) {
        questionScore = 3; // Both predefined tag + custom description
      } else if (hasCustomDescription) {
        questionScore = 2; // Only custom description
      } else if (hasPredefinedTag) {
        questionScore = 1; // Only predefined tag
      } else {
        questionScore = 0; // No meaningful input
      }
      
      totalScore += questionScore;
      maxPossibleScore += maxQuestionScore;
    });

    return {
      score: totalScore,
      maxScore: maxPossibleScore,
      percentage: maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0
    };
  };

  const getScoreBand = (percentage) => {
    if (percentage >= 70) {
      return {
        zone: 'green',
        label: 'Strong Foundation',
        description: 'Ready to optimize and scale',
        color: '#10B981'
      };
    } else if (percentage >= 40) {
      return {
        zone: 'yellow',
        label: 'Room for Improvement',
        description: 'Good potential with focused effort',
        color: '#F59E0B'
      };
    } else {
      return {
        zone: 'red',
        label: 'Needs Immediate Attention',
        description: 'Significant opportunities for growth',
        color: '#EF4444'
      };
    }
  };

  const AnalyticsSection = ({ formData, onContinue }) => {
    const totalScoreData = calculateTotalScore(formData);
    const scoreBand = getScoreBand(totalScoreData.totalPercentage);
    
    return (
      <div className="analytics-container">
        <div className="analytics-header">
          <h2 className="analytics-title">Your Business Readiness Analysis</h2>
          <p className="analytics-subtitle">
            Based on your responses, here's what we discovered about your business
          </p>
        </div>

        {/* Main content grid for side-by-side layout */}
        <div className="analytics-main-content">
          {/* Score Display Section - SIMPLIFIED */}
          <div className="score-display">
            <div className="score-circle-container">
              <div className={`score-circle ${scoreBand.zone}`}>
                <div className="score-percentage">
                  {totalScoreData.totalPercentage}%
                </div>
                <div className="score-label">
                  Business Readiness
                </div>
              </div>
            </div>
            
            <div className="score-details">
              <div className={`score-band ${scoreBand.zone}`}>
                <h3 className="band-label">{scoreBand.label}</h3>
                <p className="band-description">{scoreBand.description}</p>
              </div>
              
              {/* REMOVED: Score breakdown section */}
              {/* 
              <div className="score-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Assessment Questions:</span>
                  <span className="breakdown-score">{totalScoreData.mcqScore.score}/{totalScoreData.mcqScore.maxScore}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Challenges & Vision:</span>
                  <span className="breakdown-score">{totalScoreData.descriptiveScore.score}/{totalScoreData.descriptiveScore.maxScore}</span>
                </div>
                <div className="breakdown-item total">
                  <span className="breakdown-label">Total Score:</span>
                  <span className="breakdown-score">{totalScoreData.totalScore}/{totalScoreData.totalMaxScore}</span>
                </div>
              </div>
              */}
            </div>
          </div>

          {/* Insights Section */}
          <div className="insights-section">
            <h3 className="insights-title">Key Insights & Recommendations</h3>
            <div className="insights-content">
              {scoreBand.zone === 'green' && (
                <div className="insight-item">
                  <div className="insight-icon">🚀</div>
                  <div className="insight-text">
                    <h4>Ready for Growth</h4>
                    <p>Your business shows strong fundamentals. You're positioned well for scaling and optimization initiatives.</p>
                  </div>
                </div>
              )}
              
              {scoreBand.zone === 'yellow' && (
                <div className="insight-item">
                  <div className="insight-icon">⚡</div>
                  <div className="insight-text">
                    <h4>Growth Potential Identified</h4>
                    <p>You have solid foundations with specific areas for improvement. Focused strategies could unlock significant growth.</p>
                  </div>
                </div>
              )}
              
              {scoreBand.zone === 'red' && (
                <div className="insight-item">
                  <div className="insight-icon">🎯</div>
                  <div className="insight-text">
                    <h4>High-Impact Opportunities</h4>
                    <p>Your business has tremendous potential for transformation. Strategic changes could yield dramatic improvements.</p>
                  </div>
                </div>
              )}
              
              <div className="insight-item">
                <div className="insight-icon">📊</div>
                <div className="insight-text">
                  <h4>Personalized Action Plan</h4>
                  <p>We'll send you a detailed analysis with specific, actionable recommendations tailored to your responses.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button - spans both columns */}
          <div className="analytics-actions">
            <button
              onClick={onContinue}
              className="continue-analysis-btn"
            >
              Get My Detailed Report
              <span className="btn-arrow">→</span>
            </button>
            <p className="privacy-note">
              We'll send your personalized insights to your email - no spam, just value.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleStart = () => {
    setCurrentStep(0);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  // Show loading screen
  if (isCalculating) {
    return (
      <section id="questionnaire" className="questionnaire-section">
        <div className="questionnaire-container">
          <LoadingScreen progress={loadingProgress} />
        </div>
      </section>
    );
  }

  // Show analytics section
  if (showAnalytics) {
    return (
      <section id="questionnaire" className="questionnaire-section">
        <div className="questionnaire-container">
          <AnalyticsSection
            formData={formData}
            onContinue={handleContinueFromAnalytics}
          />
        </div>
      </section>
    );
  }

  // Main questionnaire section
  return (
    <section id="questionnaire" className="questionnaire-section">
      {isAlertVisible && <ThemeAlert message={alertMessage} onClose={() => setIsAlertVisible(false)} />}
      <div className="questionnaire-container">
        {/* Welcome screen logic */} 
        {currentStep === -1 ? (
          <div className="welcome-container">
            <h1 className="welcome-title">Welcome to the PyroReality Check!</h1>
            <p className="welcome-description">
              This quick 3-minute check-up helps us understand your business. Be honest—your answers provide the insights we need to tailor the perfect growth strategy for you.
            </p>
            
            {/* Add name input field */}
            <div className="name-input-container">
              <label htmlFor="welcomeName" className="name-label">First, what can we call you?</label>
              <div className="input-wrapper">
                <input
                  id="welcomeName"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="welcome-name-input"
                  autoFocus={!isMobileDevice()}
                />
              </div>
            </div>
            
            <button
              onClick={handleStartWithName}
              className={`start-button ${!formData.name.trim() ? 'disabled' : ''}`}
              disabled={!formData.name.trim()}
            >
              Let's Begin
            </button>
          </div>
        ): (
          <>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              {/* Only show progress text if it's not the last step */}
              {!isLastQuestion && (
                <span className="progress-text">
                  Question {currentStep + 1} of {questions.length - 1}
                </span>
              )}
            </div>

            <div className="questionnaire-header">
              <h1 className="questionnaire-title">
                {currentQuestion.question}
              </h1>
            </div>
            <form className="questionnaire-form" onSubmit={handleNext}>
              <div className="question-container">
                {renderInput()}
              </div>
              <div className="navigation-buttons">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="nav-button prev-button"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  type="submit"
                  className="nav-button next-button"
                >
                  {isLastQuestion ? 'Submit' : 'Next →'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Questionnaire;