const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./config/db');
const router = express.Router();
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
const onboardRoutes = require('./routes/onboardRoutes');
router.use('/', userRoutes);
router.use('/', onboardRoutes);
app.use('/api/users', router);
const workoutRoutes = require('./routes/workoutplanRoutes');
app.use('/api/workouts', workoutRoutes);



// Default route
app.get('/', (req, res) => {
    res.send('Fitness Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
