const db = require('../config/db');
const { protect } = require('../middleware/authMiddleware');


const onboardUser = async (req, res) => {
    const {height, weight, goal} = req.body;
    const uid = req.user.UserID;

    try {
        await db.promise().query(
          'UPDATE User SET Height = ?, Weight = ?, Goal = ?, is_onboarded = ? WHERE UserID = ?',
          [height, weight, goal, true, uid]
        );
        res.status(200).json({ message: 'Onboarding successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user info' });
      }

};

module.exports = onboardUser;