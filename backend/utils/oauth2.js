const { google } = require('googleapis');

/**
 * OAuth2 Client for Gmail API
 */
class OAuth2Client {
  constructor() {
    this.clientId = process.env.GMAIL_CLIENT_ID;
    this.clientSecret = process.env.GMAIL_CLIENT_SECRET;
    this.redirectUri = 'urn:ietf:wg:oauth:2.0:oob'; // For installed applications
    this.refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      throw new Error('Missing OAuth2 credentials. Please check your environment variables.');
    }

    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUri
    );

    this.oauth2Client.setCredentials({
      refresh_token: this.refreshToken
    });
  }

  /**
   * Get a fresh access token using the refresh token
   * @returns {Promise<string>} Access token
   */
  async getAccessToken() {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      return credentials.access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
      throw new Error('Failed to refresh OAuth2 access token');
    }
  }

  /**
   * Generate OAuth2 URL for initial authorization (used for setup only)
   * @returns {string} Authorization URL
   */
  generateAuthUrl() {
    const scopes = ['https://mail.google.com/'];
    
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent' // Force consent screen to get refresh token
    });
  }

  /**
   * Exchange authorization code for tokens (used for setup only)
   * @param {string} code - Authorization code from Google
   * @returns {Promise<Object>} Token object with refresh_token
   */
  async getTokens(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error.message);
      throw new Error('Failed to exchange authorization code for tokens');
    }
  }
}

module.exports = OAuth2Client;