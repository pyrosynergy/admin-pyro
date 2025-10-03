/**
 * OAuth2 Email Test Script
 * 
 * This script tests your Gmail OAuth2 configuration by sending a test email.
 * Run this after setting up your OAuth2 credentials to verify everything works.
 * 
 * Usage: node scripts/test-oauth-email.js
 */

require('dotenv').config();
const { sendThankYouMail } = require('../utils/mailer');

async function testOAuth2Email() {
  console.log('🧪 Testing Gmail OAuth2 Configuration');
  console.log('=====================================\n');

  // Check if all required environment variables are set
  const requiredVars = [
    'EMAIL_USER',
    'GMAIL_CLIENT_ID', 
    'GMAIL_CLIENT_SECRET',
    'GMAIL_REFRESH_TOKEN'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.log('\n📋 Please update your .env file with the missing variables.');
    console.log('   Refer to GMAIL_OAUTH_SETUP.md for detailed setup instructions.\n');
    process.exit(1);
  }

  console.log('✅ All required environment variables found');
  console.log(`📧 Sending test email from: ${process.env.EMAIL_USER}\n`);

  try {
    // Send test email to the configured email address
    const testEmail = process.env.EMAIL_USER; // Send to self for testing
    const result = await sendThankYouMail(testEmail, 'Test User');
    
    console.log('✅ Test email sent successfully!');
    console.log(`📬 Message ID: ${result.messageId}`);
    console.log(`📧 Sent to: ${testEmail}`);
    console.log('\n🎉 Your Gmail OAuth2 configuration is working correctly!');
    console.log('   You can now deploy to Vercel with confidence.\n');
    
  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    
    if (error.message.includes('OAuth2')) {
      console.log('- Check your OAuth2 credentials in the .env file');
      console.log('- Verify your refresh token is valid');
      console.log('- Run: node scripts/generate-oauth-tokens.js to get a new token');
    } else if (error.message.includes('authentication')) {
      console.log('- Ensure Gmail API is enabled in Google Cloud Console');
      console.log('- Check that your OAuth2 client has the correct scopes');
    } else {
      console.log('- Check your internet connection');
      console.log('- Verify the EMAIL_USER is a valid Gmail address');
    }
    
    console.log('- Review the full error details above');
    console.log('- Consult GMAIL_OAUTH_SETUP.md for detailed setup instructions\n');
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Test cancelled.');
  process.exit(0);
});

testOAuth2Email();