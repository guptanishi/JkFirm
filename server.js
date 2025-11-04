'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// CORS configuration for Vercel
app.use(cors({
  origin: '*',  // Temporarily allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use Express built-in body parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Database connection - with connection reuse for serverless
let cachedDb = null;
const db = require("./app/models");

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    cachedDb = db.mongoose.connection;
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Wrap all route handlers with database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

// API Routes
require("./app/routes/product.routes")(app);

// Serve static files only in development
if (process.env.NODE_ENV !== 'production') {
  const serveStatic = require('serve-static');
  app.use(serveStatic(__dirname + "/dist"));
  
  // Serve index.html for all routes in development
  app.get("*", (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });

  // Start server only in development
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

// Error handling middleware - must be after all routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export for Vercel serverless deployment
module.exports = app;