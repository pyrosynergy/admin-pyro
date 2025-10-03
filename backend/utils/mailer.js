const nodemailer = require('nodemailer');
const OAuth2Client = require('./oauth2');

/**
 * Create Nodemailer transporter with Gmail OAuth2 authentication
 * This approach is more secure and works reliably on production platforms like Vercel
 */
async function createTransporter() {
  try {
    const oauth2Client = new OAuth2Client();
    const accessToken = await oauth2Client.getAccessToken();

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error.message);
    throw new Error('Email service configuration failed');
  }
}

async function sendThankYouMail(to, name) {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: `"PyroSynergy" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Thank you for completing your Reality Check!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Hi ${name},</h2>
          <p>Thank you for completing your <strong>Reality Check</strong> questionnaire!</p>
          <p>Your personalized business analytics are being processed and will be sent to you shortly.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Review your personalized analytics (coming soon)</li>
              <li>Book a consultation call with our experts</li>
              <li>Explore our business growth solutions</li>
            </ul>
          </div>
          <p>Best regards,<br><strong>PyroSynergy Team</strong></p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error.message);
    // Log the full error for debugging but don't expose sensitive details
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check OAuth2 configuration.');
    } else if (error.code === 'ECONNECTION') {
      throw new Error('Failed to connect to email service. Please try again later.');
    } else {
      throw new Error('Failed to send email. Please contact support if the issue persists.');
    }
  }
}

module.exports = { sendThankYouMail };