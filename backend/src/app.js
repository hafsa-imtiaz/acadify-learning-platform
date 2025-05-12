const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const createError = require('http-errors');
const http = require('http');

// Load environment variables first
const dotenv = require('dotenv');
dotenv.config();

// Then import routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes'); 
const teachRoutes = require('./routes/teacher'); 
const userRoutes = require('./routes/user')

console.log('authRoutes type:', typeof authRoutes);

// Create Express app
const app = express();

// Connect to MongoDB after loading environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Consider process.exit(1) here for critical connection failures
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Routes
console.log('Auth routes loaded');
app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teachRoutes);
app.use('/api/user', userRoutes);
// 404 handler
app.use((req, res, next) => {
   next(createError(404));
});
  
// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
  
// Set up server
const port = process.env.PORT || 5000;
app.set('port', port);
const server = http.createServer(app);
  
// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  
server.on('error', (error) => {
if (error.syscall !== 'listen') throw error;
const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
}
});

module.exports = app;