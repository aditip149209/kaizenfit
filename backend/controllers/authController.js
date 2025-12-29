import db from '../config/db.js';
import {auth} from 'express-oauth2-jwt-bearer'


export const jwtCheck = auth({
  audience: 'https://api.kaizenfit.com',
  issuerBaseURL: 'https://dev-odn7u8m3pl81gf6o.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export const syncUser = async (req, res, next) => {
  try {
    const auth0Id = req.auth.sub; // "auth0|67890abcdef"
    
    // Use auth0Id as the _id directly
    let user = await db.User.findById(auth0Id);
    
    if (!user) {
      user = await db.User.create({
        userid: auth0Id,  // ← Use Auth0 ID as primary key
        email: req.auth.email,
        name: req.auth.name,
      });
      console.log('New user created:', user);
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('User sync error:', error);
    res.status(500).json({ error: 'User sync failed' });
  }
};

