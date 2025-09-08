// Alternative email service using Web3Forms (free and simple)
const sendEmailAlternative = async (to, name, formData) => {
  console.log('🔄 Using Web3Forms alternative email service...');
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: "YOUR_ACCESS_KEY_HERE", // You need to get this from web3forms.com
        subject: "Thank you for completing your Reality Check!",
        from_name: "PyroSynergy",
        to: to,
        name: name,
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
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Alternative email sent successfully:', result);
    return result;

  } catch (error) {
    console.error('❌ Alternative email service failed:', error);
    throw error;
  }
};

// Export for testing
window.sendEmailAlternative = sendEmailAlternative;
console.log('📧 Alternative email service loaded.');
