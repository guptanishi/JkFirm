'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

// CORS configuration for Vercel
app.use(cors({
  origin: '*',  // Allow all origins in development and production for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add error handling for serverless
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Use Express built-in body parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Database connection
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Connected to the database!");
    }
  })
  .catch(err => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Cannot connect to the database!", err);
    }
    process.exit(1);
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

// Export for Vercel serverless deployment
module.exports = app;