import { createUserProfile, getUserDashboardProfile, getUserProfile } from '../models/services.js';

const getUserId = (req) => req.user?.uid;

export const getProfile = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const dashboard = await getUserDashboardProfile(userId);

    return res.status(200).json({
      user: dashboard.user,
      profile: dashboard.profile ?? (await getUserProfile(userId)),
      subscription: dashboard.subscription,
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
    return res.status(500).json({
      message: error.message || 'Error fetching profile',
    });
  }
};

export const upsertProfile = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const profile = await createUserProfile(userId, req.body);

    return res.status(200).json({
      message: 'Profile saved successfully',
      profile,
    });
  } catch (error) {
    console.error('Error in upsertProfile:', error);
    return res.status(500).json({
      message: error.message || 'Error saving profile',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await getUserDashboardProfile(userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({
      message: error.message || 'Error fetching account data',
    });
  }
};
