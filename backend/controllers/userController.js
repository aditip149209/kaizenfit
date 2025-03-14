// backend/controllers/userController.js
const db = require('../config/db'); // Adjust path as necessary

const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // User attached by authMiddleware

    // Fetch the user data from the database based on user.id
    const [userData] = await db.promise().query('SELECT UserID, Name, Email, FitnessLevel FROM User WHERE UserID = ?', [user.UserID]);
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

const saveOnboardingData = async (req, res) => {
    try {
        const { age, weight, height, fitnessGoal, activityLevel, dietaryPreferences, medicalConditions } = req.body;
        const userId = req.user.UserID;

        // Validate the data
        if (!age || !weight || !height || !fitnessGoal || !activityLevel) {
            return res.status(400).json({ message: 'Please provide all required information' });
        }

        // Save to database
        await db.promise().query(
            `UPDATE User 
             SET Age = ?, Weight = ?, Height = ?, FitnessGoal = ?, 
                 ActivityLevel = ?, HasCompletedOnboarding = true
             WHERE UserID = ?`,
            [age, weight, height, fitnessGoal, activityLevel, userId]
        );

        // Save preferences and conditions to separate tables
        for (const pref of dietaryPreferences) {
            await db.promise().query(
                'INSERT INTO UserDietaryPreferences (UserID, Preference) VALUES (?, ?)',
                [userId, pref]
            );
        }

        res.status(200).json({ message: 'Onboarding completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during onboarding' });
    }
};

module.exports = { getUserProfile, updateUserProfile, saveOnboardingData };
