const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://pyrosynergy.com', 
      'https://www.pyrosynergy.com', 
      'https://land-pyro.vercel.app',
      'https://land-pyro-git-structure1-prachetyerrs-projects.vercel.app',
      'https://admin-pyro-frontend-git-aditya-pyrosynergys-projects.vercel.app',
      'https://admin-pyro-frontend-git-dev-pyrosynergys-projects.vercel.app', // ADDED: Current frontend domain
      'https://realitycheck-1.vercel.app', // Add this based on the error screenshot
      'http://localhost:3000', 
      'http://localhost:5173',
      'http://localhost:4173', // For Vite preview
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4173'
    ];
    
    // Allow any localhost/127.0.0.1 with any port for development
    if (origin.startsWith('http://localhost:') || 
        origin.startsWith('http://127.0.0.1:') ||
        origin.startsWith('https://localhost:') || 
        origin.startsWith('https://127.0.0.1:')) {
      return callback(null, true);
    }
    
    // Allow Vercel preview URLs
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'no origin'}`);
  next();
});

// Explicit OPTIONS handler for all routes
app.use((req, res, next) => {
  // Add CORS headers to all responses
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    
    // Allow localhost and Vercel origins
    if (!origin || 
        origin.startsWith('http://localhost:') || 
        origin.startsWith('http://127.0.0.1:') ||
        origin.startsWith('https://localhost:') || 
        origin.startsWith('https://127.0.0.1:') ||
        origin.includes('vercel.app') ||
        origin.includes('pyrosynergy.com')) {
      res.header('Access-Control-Allow-Origin', origin || '*');
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
    return res.sendStatus(200);
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