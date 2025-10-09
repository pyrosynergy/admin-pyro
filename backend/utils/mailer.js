const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // set in .env
    pass: process.env.EMAIL_PASS  // set in .env
  }
});

function sendThankYouMail(to, name) {
  return transporter.sendMail({
    from: `"PyroSynergy" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Thank you for completing your Reality Check!',
    html:  `
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
  });
}

module.exports = { sendThankYouMail };