# Gmail OAuth2 Setup Guide

## Overview
This guide will walk you through setting up Gmail OAuth2 authentication for your Node.js application. This is required for production deployments on platforms like Vercel, as Gmail blocks basic password authentication.

## Step 1: Create Google Cloud Project and OAuth2 Credentials

### 1.1 Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "PyroSynergy Email Service")
4. Click "Create"

### 1.2 Enable Gmail API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Gmail API"
3. Click "Gmail API" and then "Enable"

### 1.3 Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" (unless you have Google Workspace)
3. Fill in the required fields:
   - App name: "PyroSynergy Email Service"
   - User support email: your email
   - Developer contact information: your email
4. Click "Save and Continue"
5. On "Scopes" page, click "Save and Continue" (we'll add scopes programmatically)
6. On "Test users" page, add your Gmail address as a test user
7. Click "Save and Continue"

### 1.4 Create OAuth2 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Desktop application"
4. Name it "PyroSynergy Mailer"
5. Click "Create"
6. **Save the Client ID and Client Secret** - you'll need these for your .env file

## Step 2: Generate Refresh Token

### 2.1 Run the Token Generation Script
```bash
cd backend
node scripts/generate-oauth-tokens.js
```

### 2.2 Follow the Instructions
1. The script will output an authorization URL
2. Copy and paste this URL into your browser
3. Sign in with the Gmail account you want to use for sending emails
4. Grant permissions to your application
5. Copy the authorization code from the browser
6. Paste it back into the terminal
7. The script will output your refresh token

## Step 3: Update Environment Variables

### 3.1 Update your .env file
```env
EMAIL_USER=admin@pyrosynergy.com
GMAIL_CLIENT_ID=your_client_id_here.googleusercontent.com
GMAIL_CLIENT_SECRET=your_client_secret_here
GMAIL_REFRESH_TOKEN=your_refresh_token_here
```

### 3.2 For Vercel Deployment
Add these environment variables in your Vercel dashboard:
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - `EMAIL_USER`: admin@pyrosynergy.com
   - `GMAIL_CLIENT_ID`: [your client ID]
   - `GMAIL_CLIENT_SECRET`: [your client secret]
   - `GMAIL_REFRESH_TOKEN`: [your refresh token]

## Step 4: Test the Configuration

### 4.1 Test Locally
```bash
cd backend
node scripts/test-oauth-email.js
```

### 4.2 Deploy to Vercel
```bash
vercel --prod
```

## Security Best Practices

1. **Never commit credentials to git**: Ensure .env is in your .gitignore
2. **Use different credentials for development and production**
3. **Regularly rotate your refresh tokens** (every 6 months recommended)
4. **Monitor your Google Cloud Console** for unusual API usage

## Troubleshooting

### Common Issues:

1. **"invalid_grant" error**: Your refresh token has expired. Generate a new one.
2. **"unauthorized_client" error**: Check that your OAuth2 client is configured correctly.
3. **"access_denied" error**: Ensure the Gmail account has granted permissions.

### Error Logs to Check:
- Check Vercel function logs for authentication errors
- Monitor your application logs for OAuth2 token refresh failures

## Alternative: Consider Resend.com for Production

For production applications, consider using a dedicated email service like Resend, SendGrid, or Mailgun instead of Gmail:

### Resend.com Setup (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update your environment variables:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM=PyroSynergy <noreply@yourdomain.com>
   ```

### Benefits of Dedicated Email Services:
- Better deliverability rates
- Detailed analytics
- No complex OAuth2 setup
- Better scalability
- Professional sending domains

## Migration Notes

The updated mailer maintains the same API:
```javascript
// This still works exactly the same way
await sendThankYouMail('user@example.com', 'John Doe');
```

The only difference is the internal authentication mechanism has changed from password to OAuth2.