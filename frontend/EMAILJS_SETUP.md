# EmailJS Setup Guide

This project now uses EmailJS to send emails directly from the frontend instead of using backend Nodemailer.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Enter the email credentials:
   - Email: `admin@pyrosynergy.com`
   - Password: `cdvz aqmn fygm luvy` (App Password)
5. Note down your **Service ID** (something like `service_xxxxxxx`)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: Thank you for completing your Reality Check!

Hello {{to_name}},

Thank you for completing your Reality Check questionnaire!

Your personalized business analytics:
• Business Stage: {{business_stage}}
• Business Challenge: {{business_challenge}}
• Revenue Satisfaction: {{revenue_satisfaction}}
• Success Vision: {{success_vision}}
• Total Score: {{total_score}} ({{score_percentage}}%)
• Score Band: {{score_band}}

Your personalized insights are being processed and will be sent to you shortly.

What's next?
• Review your personalized analytics (coming soon)
• Book a consultation call with our experts
• Explore our business growth solutions

Best regards,
PyroSynergy Team
```

4. Note down your **Template ID** (something like `template_xxxxxxx`)

### 4. Get Public Key
1. Go to "Account" section
2. Find your **Public Key** (something like `xxxxxxxxxxxxxxx`)

### 5. Update Environment Variables
Update your `frontend/.env` file with your EmailJS credentials:

```env
# EmailJS configuration (primary email service)
VITE_EMAILJS_SERVICE_ID=service_67lpy8i
VITE_EMAILJS_TEMPLATE_ID=template_wus2bi9
VITE_EMAILJS_PUBLIC_KEY=h4sbLDkpMghyZNrN-
```

### 6. Test the Setup
1. Run your frontend application
2. Complete the questionnaire
3. Check if the email is sent successfully
4. Monitor the EmailJS dashboard for email statistics

## Email Template Variables

The following variables are automatically passed to your email template:

- `{{to_email}}` - Recipient email address
- `{{to_name}}` - Recipient name
- `{{from_name}}` - Always "PyroSynergy"
- `{{subject}}` - Email subject
- `{{message}}` - Email body message
- `{{business_stage}}` - User's business stage
- `{{business_challenge}}` - User's business challenges
- `{{revenue_satisfaction}}` - Revenue satisfaction rating
- `{{success_vision}}` - User's success vision
- `{{total_score}}` - Calculated total score
- `{{score_percentage}}` - Score percentage
- `{{score_band}}` - Score band (green/yellow/red)

## Fallback Email Service

If EmailJS fails, the system will try to use a fallback service. To set this up:

1. Create an account with [Formspree](https://formspree.io/) or similar
2. Get your form endpoint URL
3. Update the `sendEmailFallback` function in `src/utils/mailer.js`

## Benefits of Frontend Email

✅ **Reduced server load** - No backend email processing
✅ **Better user experience** - Immediate email sending
✅ **Cost effective** - Free EmailJS tier handles most use cases
✅ **Easy to maintain** - No server email configuration needed

## Troubleshooting

### Common Issues:

1. **Emails not sending**: Check EmailJS service and template IDs
2. **Template not found**: Verify template ID in environment variables
3. **Service blocked**: Ensure Gmail app password is correct
4. **CORS errors**: EmailJS handles CORS automatically

### Email Quota:

- EmailJS free tier: 200 emails/month
- Paid tier: Higher limits available

## Security Notes

- Email credentials are securely stored in EmailJS
- No sensitive data exposed in frontend code
- App passwords used instead of regular passwords
- All EmailJS communication is encrypted

## Migration Complete

The backend email functionality has been completely removed:
- ✅ `backend/utils/mailer.js` - No longer used
- ✅ `backend/routes/questionnaire.js` - Email sending removed
- ✅ Frontend now handles all email functionality
- ✅ Database operations still work normally
