const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDb = require('./config/db');

const { ALLOWED_ORIGINS } = require('./config/origins');

const app = express();
const PORT = process.env.PORT || 5000;

// Behind Vercel's proxy; needed for secure cookies and rate limiting.
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(cookieParser());

// Explicit OPTIONS handler for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.status(200).end();
  }
  next();
});

// Ensure the DB is connected before any route runs. This sits after CORS so a
// failure still carries the CORS headers and reaches the browser as a readable
// 503 instead of an opaque "Failed to fetch".
// Scoped to /api so /health stays answerable while the DB is down.
app.use('/api', async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(503).json({
      success: false,
      message: 'Database unavailable. Please try again in a moment.',
    });
  }
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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin/employees', require('./routes/adminEmployees'));
app.use('/api/verify', require('./routes/verify'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'PyroSynergy Backend API' });
});

// Health check route. Deliberately outside the /api DB guard so it still
// answers while Mongo is unreachable — that is exactly when it is needed.
// `mongoUriConfigured` separates "env var missing" from "cannot reach Atlas".
app.get('/health', async (req, res) => {
  let dbError = null;
  try {
    await connectDb();
  } catch (err) {
    dbError = err.message;
  }
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    mongoUriConfigured: Boolean(process.env.MONGODB_URI),
    dbError,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Cloudinary env: cloud_name=${Boolean(process.env.CLOUDINARY_CLOUD_NAME)} ` +
    `api_key=${Boolean(process.env.CLOUDINARY_API_KEY)} ` +
    `api_secret=${Boolean(process.env.CLOUDINARY_API_SECRET)}`
  );
});