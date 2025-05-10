import express from 'express'
import cors from 'cors';
import { Router } from 'express';
import { connectDB } from './utils/database.js';
import dotenv from 'dotenv'
dotenv.config()

// Import routes
import authRouter from './routes/authRoutes.js';
import mainRouter from './routes/mainRoutes.js';


const router = Router();
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Function to start the server properly
const startServer = async () => {
    try {
        connectDB();
        // Start the server after everything is ready
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting the server:', error);
        process.exit(1); // Exit the process if there's a failure
    }
};

// Call the function to start everything
startServer();

router.use('/user', mainRouter);
router.use('/auth', authRouter);

app.use('/api', router);

// Default route
app.get('/', (req, res) => {
    res.send('Fitness Tracker API is running');
});
