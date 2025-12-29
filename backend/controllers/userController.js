// backend/controllers/userController.js
const db = require('../config/db'); // Adjust path as necessary

const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // User attached by authMiddleware

    // Fetch the user data from the database based on user.id
    const [userData] = await db.promise().query('SELECT * FROM User WHERE UserID = ?', [user.UserID]);
    console.log("yay");
    console.log(userData);

    if (userData.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
// Implement code to update the profile based on user.id
// Validate inputs, update the database, handle errors
};

const createUser = async (req, res) => {
  try{
    //create user when the user registers/logs in for the first time using auth0.
  }
  catch(error) {

  }
}

const onboardUser = async (req, res) => {
  //if user is not onboarded, then onboard the user
  //first check if user is onboarded
  try{

  }
  catch(error) {

  }
}



module.exports = { getUserProfile, updateUserProfile };
