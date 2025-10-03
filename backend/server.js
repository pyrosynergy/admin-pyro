const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable trust proxy for Vercel
app.set('trust proxy', 1);

// Simplified CORS middleware for Vercel
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://pyrosynergy.com',
    'https://www.pyrosynergy.com',
    'https://land-pyro.vercel.app',
    'https://land-pyro-git-structure1-prachetyerrs-projects.vercel.app',
    'https://admin-pyro-frontend-git-testing1-pyrosynergys-projects.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection with error handling
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas connected successfully');
    console.log('Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Don't exit on MongoDB error in serverless
  });

  // Handle MongoDB connection events
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
} else {
  console.log('MongoDB URI not provided');
}

// Routes
app.use('/api/questionnaire', require('./routes/questionnaire'));

// Basic route
app.get('/', (req, res) => {
  try {
    res.json({ 
      message: 'PyroSynergy Backend API', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// CORS test route
app.get('/api/test', (req, res) => {
  try {
    res.json({ 
      message: 'CORS test successful', 
      origin: req.headers.origin,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      status: 'ok', 
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Health check failed' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server for local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;