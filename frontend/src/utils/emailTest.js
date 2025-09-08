import emailjs from '@emailjs/browser';

// Simple test function to verify EmailJS setup
const testEmailJS = async () => {
  console.log('🧪 Testing EmailJS Configuration...');
  
  // Get environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  console.log('Environment Variables:');
  console.log('- Service ID:', serviceId);
  console.log('- Template ID:', templateId);
  console.log('- Public Key:', publicKey ? 'Found' : 'Missing');
  
  if (!serviceId || !templateId || !publicKey) {
    console.error('❌ Missing EmailJS configuration!');
    return;
  }
  
  // Initialize EmailJS
  emailjs.init(publicKey);
  console.log('✅ EmailJS initialized');
  
  // Test template parameters
  const testParams = {
    to_email: 'admin@pyrosynergy.com',
    to_name: 'Test User',
    from_name: 'PyroSynergy',
    subject: 'Test Email',
    message: 'This is a test email from the questionnaire system.',
    business_stage: 'Test Stage',
    business_challenge: 'Test Challenge',
    revenue_satisfaction: '5',
    success_vision: 'Test Vision',
    total_score: '50',
    score_percentage: '75',
    score_band: 'green'
  };
  
  try {
    console.log('🚀 Sending test email...');
    const result = await emailjs.send(serviceId, templateId, testParams);
    console.log('✅ Test email sent successfully!', result);
    return result;
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return null;
  }
};

// Export the test function
window.testEmailJS = testEmailJS;

console.log('📧 Email test function loaded. You can now run testEmailJS() in console.');
