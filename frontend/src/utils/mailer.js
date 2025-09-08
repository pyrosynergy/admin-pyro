import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  console.log('🔧 Initializing EmailJS...');
  console.log('📧 Public Key:', publicKey ? `${publicKey.substring(0, 5)}...` : 'NOT FOUND');
  
  if (!publicKey) {
    console.error('❌ EmailJS Public Key is missing in environment variables');
    return false;
  }
  
  try {
    emailjs.init(publicKey);
    console.log('✅ EmailJS initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ EmailJS initialization failed:', error);
    return false;
  }
};

// Alternative approach: Use a direct email service API
const sendThankYouMail = async (to, name, formData) => {
  console.log('📬 Starting email sending process...');
  console.log('📧 Recipient:', to);
  console.log('👤 Name:', name);
  
  // Check environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  console.log('🔑 Environment Variables Check:');
  console.log('   - Service ID:', serviceId || '❌ MISSING');
  console.log('   - Template ID:', templateId || '❌ MISSING');
  console.log('   - Public Key:', publicKey ? '✅ Found' : '❌ MISSING');
  
  if (!serviceId || !templateId || !publicKey) {
    console.error('❌ Missing required EmailJS configuration');
    return await sendEmailFallback(to, name, formData);
  }

  try {
    // Template parameters for EmailJS
    const templateParams = {
      to_email: to,
      email: to,  // Added for Reply To field
      to_name: name,
      name: name,  // Added for From Name field  
      from_name: 'PyroSynergy',
      subject: 'Thank you for completing your Reality Check!',
      message: `
        Hi ${name},
        
        Thank you for completing your Reality Check questionnaire!
        
        Your personalized business analytics are being processed and will be sent to you shortly.
        
        What's next?
        • Review your personalized analytics (coming soon)
        • Book a consultation call with our experts
        • Explore our business growth solutions
        
        Best regards,
        PyroSynergy Team
      `,
      // Include form data for analytics
      business_stage: formData.businessStage || 'Not specified',
      business_challenge: formData.businessChallenge || 'Not specified',
      revenue_satisfaction: formData.revenueSatisfaction || 'Not specified',
      success_vision: formData.successVision || 'Not specified',
      total_score: formData.totalScore || 0,
      score_percentage: formData.totalPercentage || 0,
      score_band: formData.scoreBand || 'Not calculated'
    };

    console.log('📋 Template Parameters:');
    console.log('   - To Email:', templateParams.to_email);
    console.log('   - To Name:', templateParams.to_name);
    console.log('   - Business Stage:', templateParams.business_stage);
    console.log('   - Total Score:', templateParams.total_score);
    console.log('   - Score Percentage:', templateParams.score_percentage);

    console.log('🚀 Sending email via EmailJS...');
    console.log('   - Service ID:', serviceId);
    console.log('   - Template ID:', templateId);
    console.log('   - To Email Address:', templateParams.to_email);
    console.log('🎯 IMPORTANT: Email will be sent to:', templateParams.to_email);
    console.log('📧 Make sure your EmailJS template "To Email" field is set to: {{to_email}}');

    // Send email via EmailJS
    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    console.log('✅ Email sent successfully via EmailJS!');
    console.log('📊 EmailJS Response:', result);
    console.log('   - Status:', result.status);
    console.log('   - Text:', result.text);
    
    // Additional check for email delivery
    if (result.status === 200) {
      console.log('🎉 EmailJS reports successful delivery');
      console.log('⏰ Email should arrive within 1-5 minutes');
      console.log('📧 Check spam folder if not received');
    } else {
      console.warn('⚠️ Unexpected status code:', result.status);
    }
    
    return result;

  } catch (error) {
    console.error('❌ EmailJS sending failed:');
    console.error('   - Error:', error);
    console.error('   - Error message:', error.message);
    console.error('   - Error code:', error.code);
    console.error('   - Error status:', error.status);
    
    // Fallback: Try alternative email service
    console.log('🔄 Trying fallback email service...');
    return await sendEmailFallback(to, name, formData);
  }
};

// Fallback email method using a simple email API
const sendEmailFallback = async (to, name, formData) => {
  console.log('🔄 Using fallback email service...');
  
  try {
    // Using a simple email service like Formspree or similar
    const fallbackUrl = 'https://formspree.io/f/your_form_id'; // You need to set this up
    
    console.log('📡 Fallback URL:', fallbackUrl);
    console.warn('⚠️ Fallback service not configured - this is just a placeholder');
    
    const emailData = {
      email: to,
      name: name,
      subject: 'Thank you for completing your Reality Check!',
      message: `
        Hi ${name},
        
        Thank you for completing your Reality Check questionnaire!
        
        Your personalized business analytics:
        • Business Stage: ${formData.businessStage || 'Not specified'}
        • Total Score: ${formData.totalScore || 0}/${formData.totalMaxScore || 0} (${formData.totalPercentage || 0}%)
        • Score Band: ${formData.scoreLabel || 'Not calculated'}
        
        Your personalized insights are being processed and will be sent to you shortly.
        
        What's next?
        • Review your personalized analytics (coming soon)
        • Book a consultation call with our experts
        • Explore our business growth solutions
        
        Best regards,
        PyroSynergy Team
      `
    };
    
    console.log('📦 Fallback email data prepared:', emailData);
    
    // Commenting out actual request since fallback URL is not configured
    /*
    const response = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Failed to send email via fallback service');
    }

    const result = await response.json();
    console.log('✅ Fallback email sent successfully:', result);
    return result;
    */
    
    console.warn('⚠️ Fallback email service is not configured. Email was not sent.');
    throw new Error('Both EmailJS and fallback service failed');
    
  } catch (error) {
    console.error('❌ Fallback email service also failed:', error);
    throw error;
  }
};

// Initialize EmailJS when the module loads
console.log('🔄 Loading email utility module...');
const isInitialized = initEmailJS();
if (isInitialized) {
  console.log('📧 Email service ready to use');
} else {
  console.warn('⚠️ Email service initialization failed');
}

export { sendThankYouMail };
