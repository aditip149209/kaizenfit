import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { db, connectDB } from './config/db.js';
import './models/User.js'
import { Router } from 'express';
import { jwtCheck, syncUser } from './controllers/authController.js';

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

const startServer = async () => {
    try {
        await connectDB();
        // Start the server after everything is ready
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(' Error starting the server:', error);
        process.exit(1); // Exit the process if there's a failure
    }
};

// Call the function to start everything
startServer();

app.get('/', ()=> {
    console.log('yahoo');
}) 

// Add a test endpoint
app.get('/api/test/auth', jwtCheck, syncUser, (req, res) => {
  res.json({
    message: 'Authentication successful',
    auth0Data: req.auth,      // Data from Auth0 JWT
    databaseUser: req.user,   // Data from your database
    comparison: {
      auth0Id: req.auth.sub,
      yourDbId: req.user._id,
      areTheSame: req.auth.sub === req.user._id.toString()
    }
  });
});





