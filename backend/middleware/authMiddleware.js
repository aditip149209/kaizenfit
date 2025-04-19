import jwt from 'jsonwebtoken'
import { getUserBYID } from '../models/services/userQuery.js';

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            // Get user from database by decoded UserID
            const user = await getUserBYID(decoded.id);
            // console.log(user.dataValues);

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user[0]; // Attach user data to request object
            next(); // Proceed to next middleware or route handler

        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export {protect};
