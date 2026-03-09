import { createUserProfile, updateUserOnboardStatus } from '../models/services.js';

// Create user profile
export const createProfile = async (req, res) => {
  try {
    const userId = req.user?.uid;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      gender,
      height,
      heightType,
      weight,
      weightType,
      goal,
      activityLevel,
      injuries
    } = req.body;

    // Validate required fields
    if (!gender || !height || !heightType || !weight || !weightType || !goal || !activityLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const profile = await createUserProfile(userId, {
      gender,
      height,
      heightType,
      weight,
      weightType,
      goal,
      activityLevel,
      injuries
    });

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    });
  } catch (error) {
    console.error('Error in createProfile:', error);
    res.status(500).json({ 
      message: error.message || 'Error creating profile' 
    });
  }
};

// Update user onboarded status
export const updateOnboardStatus = async (req, res) => {
  try {
    const userId = req.user?.uid;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { isOnboarded } = req.body;

    if (typeof isOnboarded !== 'boolean') {
      return res.status(400).json({ message: 'isOnboarded must be a boolean' });
    }

    const user = await updateUserOnboardStatus(userId, isOnboarded);

    res.status(200).json({
      message: 'Onboarding status updated successfully',
      user
    });
  } catch (error) {
    console.error('Error in updateOnboardStatus:', error);
    res.status(500).json({ 
      message: error.message || 'Error updating onboarding status' 
    });
  }
};
