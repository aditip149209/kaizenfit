const checkOnboarding = async (req, res, next) => {
    try {
        const [user] = await db.promise().query(
            'SELECT is_onboarded FROM User WHERE UserID = ?',
            [req.user.UserID]
        );

        if (!user[0].is_onboarded) {
            return res.status(403).json({ 
                message: 'Please complete onboarding',
                redirectTo: '/onboarding'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}; 