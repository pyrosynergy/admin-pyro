const nodemailer = require('nodemailer');

// Add logging for debugging
console.log('📧 Mailer Config Check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Make sure this matches your .env
    pass: process.env.EMAIL_PASS  // Make sure this matches your .env
  }
});

// Test the transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ Email transporter verification failed:', error);
  } else {
    console.log('✅ Email transporter is ready to send messages');
  }
});

function sendThankYouMail(to, name) {
  console.log(`📤 Attempting to send email to: ${to}`);
  
  return transporter.sendMail({
    from: `"PyroSynergy" <${process.env.EMAIL_USER}>`,
    to: to,
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
  }).then(info => {
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  }).catch(error => {
    console.error('❌ Email sending failed:', error);
    throw error;
  });
}

module.exports = { sendThankYouMail };