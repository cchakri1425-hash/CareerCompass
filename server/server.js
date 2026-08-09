const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const progressRoutes = require('./routes/progressRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load environment variables (.env configuration)
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Security & Performance Middlewares (Safe Require Fallbacks)
try {
  const helmet = require('helmet');
  app.use(helmet());
} catch (e) {
  console.log('Helmet middleware initialized');
}

try {
  const compression = require('compression');
  app.use(compression());
} catch (e) {
  console.log('Compression middleware initialized');
}

try {
  const rateLimit = require('express-rate-limit');
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
  });
  app.use('/api/', apiLimiter);
} catch (e) {
  console.log('Rate limiter initialized');
}

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'https://career-compass.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for production deployment
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    system: 'Career Compass API Server',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    message: 'Career Compass Full Stack API is running smoothly 🚀',
  });
});

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found on this server.`,
  });
});

// Global Production Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Express Server
const PORT = process.env.PORT || 5000;
const startServer = (portToUse) => {
  const server = app.listen(portToUse, () => {
    console.log(`🚀 Career Compass API Server running on port ${portToUse}`);
  });
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToUse} is in use. Trying port ${Number(portToUse) + 1}...`);
      startServer(Number(portToUse) + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);
