/**
 * OAuth2 Token Generation Script for Gmail
 * 
 * This script helps you generate the refresh token needed for Gmail OAuth2 authentication.
 * Run this script once during setup to get your refresh token.
 * 
 * Prerequisites:
 * 1. Create OAuth2 credentials in Google Cloud Console
 * 2. Update your .env file with GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET
 * 3. Run: node scripts/generate-oauth-tokens.js
 */

require('dotenv').config();
const { google } = require('googleapis');
const readline = require('readline');

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob' // For installed applications
);

// Scopes required for sending emails via Gmail
const SCOPES = ['https://mail.google.com/'];

async function generateTokens() {
  // Check if credentials are configured
  if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
    console.error('❌ Missing OAuth2 credentials!');
    console.log('Please ensure your .env file contains:');
    console.log('GMAIL_CLIENT_ID=your_client_id_here');
    console.log('GMAIL_CLIENT_SECRET=your_client_secret_here');
    process.exit(1);
  }

  console.log('🚀 Gmail OAuth2 Token Generator');
  console.log('=====================================\n');

  // Generate authorization URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // This ensures we get a refresh token
  });

  console.log('📋 Steps to complete authorization:');
  console.log('1. Open this URL in your browser:');
  console.log(`\n   ${authUrl}\n`);
  console.log('2. Sign in with your Gmail account');
  console.log('3. Grant permissions to your application');
  console.log('4. Copy the authorization code from the browser');
  console.log('5. Paste it below when prompted\n');

  // Get authorization code from user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('🔑 Enter the authorization code from Google: ', async (code) => {
    rl.close();
    
    try {
      console.log('\n⏳ Exchanging authorization code for tokens...');
      
      const { tokens } = await oauth2Client.getToken(code);
      
      console.log('\n✅ Success! Your OAuth2 tokens:');
      console.log('=====================================');
      console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
      console.log('=====================================\n');
      
      console.log('📝 Next steps:');
      console.log('1. Copy the GMAIL_REFRESH_TOKEN value above');
      console.log('2. Add it to your .env file');
      console.log('3. Add the same variable to your Vercel environment variables');
      console.log('4. Test your configuration with: node scripts/test-oauth-email.js\n');
      
      // Verify the token works
      oauth2Client.setCredentials(tokens);
      console.log('🔍 Verifying token validity...');
      
      const { credentials } = await oauth2Client.refreshAccessToken();
      if (credentials.access_token) {
        console.log('✅ Token verification successful! Your setup is ready.\n');
      }
      
    } catch (error) {
      console.error('❌ Error generating tokens:', error.message);
      console.log('\n🔧 Troubleshooting tips:');
      console.log('- Ensure you copied the entire authorization code');
      console.log('- Check that your OAuth2 client is configured correctly in Google Cloud Console');
      console.log('- Make sure the Gmail API is enabled for your project');
      process.exit(1);
    }
  });
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Token generation cancelled.');
  process.exit(0);
});

generateTokens().catch(console.error);