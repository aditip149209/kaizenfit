const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Fitness Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
