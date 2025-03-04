const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'aditi',         // Your MySQL username
    password: 'root',      // Your MySQL password
    database: 'kaizenfit'   // Your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err.message);
    } else {
        console.log('✅ MySQL connected successfully!');
    }
});

module.exports = db;

