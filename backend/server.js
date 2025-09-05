const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - More permissive CORS for testing
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://pyrosynergy.com', 
      'https://www.pyrosynergy.com', 
      'https://land-pyro.vercel.app',
      'https://admin-pyro.vercel.app',
      'https://admin-pyro-git-main-pyrosynergys-projects.vercel.app',
      'https://admin-pyro-git-aditya-pyrosynergys-projects.vercel.app',
      'https://land-pyro-git-structure1-prachetyerrs-projects.vercel.app',
      'http://localhost:3000', 
      'http://localhost:3001', 
      'http://localhost:5173'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
      return callback(null, true);
    }
    
    console.log('CORS blocked origin:', origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Enhanced OPTIONS handler with logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin}`);
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    return res.status(200).end();
  }
  next();
});

// MongoDB Connection with simplified options
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB Atlas connected successfully');
  console.log('Database:', mongoose.connection.name);
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if can't connect to database
});

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api/questionnaire', require('./routes/questionnaire'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'PyroSynergy Backend API' });
});

// Health check route
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});