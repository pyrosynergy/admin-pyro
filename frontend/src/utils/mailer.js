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
    console.error('   - Full error object:', JSON.stringify(error, null, 2));
    
    // Check for specific EmailJS errors
    if (error.status === 400) {
      console.error('🚨 EmailJS Error: Bad Request - Check template ID and service ID');
    } else if (error.status === 401) {
      console.error('🚨 EmailJS Error: Unauthorized - Check public key');
    } else if (error.status === 404) {
      console.error('🚨 EmailJS Error: Not Found - Service or template doesn\'t exist');
    }
    
    // Fallback: Try alternative email service
    console.log('🔄 EmailJS failed, trying Web3Forms fallback service...');
    return await sendEmailFallback(to, name, formData);
  }
};

// Fallback email method using Web3Forms (free and reliable)
const sendEmailFallback = async (to, name, formData) => {
  console.log('🔄 Using Web3Forms fallback email service...');
  
  try {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error('❌ Web3Forms access key not found');
      throw new Error('Web3Forms not configured');
    }
    
    console.log('📡 Web3Forms access key found');
    
    const emailData = {
      access_key: accessKey,
      subject: "Thank you for completing your Reality Check!",
      from_name: "PyroSynergy Team",
      to: to,
      name: name,
      email: to, // Reply-to email
      message: `
Hi ${name},

Thank you for completing your Reality Check questionnaire!

Your personalized business analytics:
• Business Stage: ${formData.businessStage || 'Not specified'}
• Business Challenge: ${formData.businessChallenge || 'Not specified'}
• Revenue Satisfaction: ${formData.revenueSatisfaction || 'Not specified'}
• Success Vision: ${formData.successVision || 'Not specified'}
• Total Score: ${formData.totalScore || 0} (${formData.totalPercentage || 0}%)
• Score Band: ${formData.scoreBand || 'Not calculated'}

Your personalized insights are being processed and will be sent to you shortly.

What's next?
• Review your personalized analytics (coming soon)
• Book a consultation call with our experts
• Explore our business growth solutions

Best regards,
PyroSynergy Team
      `
    };
    
    console.log('📦 Web3Forms email data prepared for:', to);
    
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`Web3Forms HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Web3Forms email sent successfully:', result);
    
    if (result.success) {
      console.log('🎉 Email delivered successfully via Web3Forms!');
      return result;
    } else {
      throw new Error(result.message || 'Web3Forms reported failure');
    }
    
  } catch (error) {
    console.error('❌ Web3Forms email service failed:', error);
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
