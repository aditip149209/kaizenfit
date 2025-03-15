const db = require('../config/db');

const onboardUser = async (req, res) => {
    const {height, weight, goal, birthday} = req.body;
    const uid = req.user.UserID;

    try {
        await db.promise().query(
          'UPDATE User SET Height = ?, Weight = ?, Goal = ?, is_onboarded = ?, DOB = ? WHERE UserID = ?',
          [height, weight, goal, true, birthday, uid]
        );
        res.status(200).json({ message: 'Onboarding successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user info' });
      }

};

module.exports = onboardUser;