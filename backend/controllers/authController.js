const db = require('../config/db'); // Import MySQL connection
const bcrypt = require('bcryptjs'); // For hashing and comparing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Register User Controller
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
      // Check if the user already exists
      const [existingUser] = await db.promise().query('SELECT * FROM User WHERE Email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Email is already registered' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      await db.promise().query(
        'INSERT INTO User (Name, Email, Password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' }); // Validate input
  }

  try {

    const [user] = await db.promise().query('SELECT * FROM User WHERE Email = ?', [email]);
    if (!user || user.length === 0) {
      console.log('here is error')
        return res.status(401).json({ message: 'Invalid email or password' }); // User not found
      }
    const pw = user[0].Password;
    console.log(user);
    console.log(` password is : `,pw);

  
    const isPasswordValid = await bcrypt.compare(password, user[0].Password);

    if (!isPasswordValid) {
        console.log('here is 2nd error');
      return res.status(401).json({ message: 'Invalid email or password' }); // Incorrect password
    }

    const token = jwt.sign({ UserID: user[0].UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token }); // Send success response with token
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
};
