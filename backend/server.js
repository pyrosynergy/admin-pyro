const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://pyrosynergy.com', 
    'https://www.pyrosynergy.com', 
    'https://land-pyro.vercel.app',
    'https://admin-pyro.vercel.app',  // Add your frontend Vercel URL
    'https://admin-pyro-git-main-pyrosynergys-projects.vercel.app',  // Git-based URL
    'https://admin-pyro-git-aditya-pyrosynergys-projects.vercel.app',  // Frontend preview URL
    'https://land-pyro-git-structure1-prachetyerrs-projects.vercel.app',
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Explicit OPTIONS handler for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
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