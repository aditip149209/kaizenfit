import { createUserProfile, getUserDashboardProfile, getUserProfile } from '../models/services.js';
import { calculateDailyCalorieIntake } from '../utils/calorieCalculator.js';
import { uploadProfilePictureToFirebase, deleteProfilePictureFromFirebase } from '../utils/firebaseStorageService.js';
import { UserProfile, NotificationPreferences, User } from '../models/User.js';
import sequelize from 'sequelize';

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

/**
 * Update account settings (username, address, height, goal)
 * Restricted fields: email (cannot edit), gender (cannot edit)
 */
export const updateAccountSettings = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { username, address, height, heightType, goal } = req.body;

    // Only allow specific fields to be updated
    const allowedUpdates = {};
    if (username !== undefined) allowedUpdates.username = username;
    if (address !== undefined) allowedUpdates.address = address;
    if (height !== undefined) allowedUpdates.height = height;
    if (heightType !== undefined) allowedUpdates.heightType = heightType;
    if (goal !== undefined) allowedUpdates.goal = goal;

    // Update UserProfile
    const updatedProfile = await UserProfile.update(allowedUpdates, {
      where: { userid: userId },
      returning: true,
    });

    if (updatedProfile[0] === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Recalculate daily calorie intake if height or goal changed
    if ((height !== undefined || goal !== undefined) && updatedProfile[1][0]) {
      const profile = updatedProfile[1][0].dataValues;
      const dailyCalorieIntake = calculateDailyCalorieIntake({
        weight: profile.weight,
        height: profile.height,
        age: profile.age,
        gender: profile.gender,
        activityLevel: profile.activityLevel,
        goal: profile.goal,
      });
      
      await UserProfile.update(
        { dailyCalorieIntake },
        { where: { userid: userId } }
      );
      profile.dailyCalorieIntake = dailyCalorieIntake;
    }

    return res.status(200).json({
      message: 'Account settings updated successfully',
      profile: updatedProfile[1][0],
    });
  } catch (error) {
    console.error('Error in updateAccountSettings:', error);
    return res.status(500).json({
      message: error.message || 'Error updating account settings',
    });
  }
};

/**
 * Upload or update profile picture
 * Saves to Firebase Storage and stores URL in database
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Accept either file upload or base64 string
    let base64String = req.body.profilePictureUrl;

    if (!base64String && req.file) {
      // Handle multipart file upload
      base64String = req.file.buffer.toString('base64');
    }

    if (!base64String) {
      return res.status(400).json({ message: 'Profile picture is required (base64 or file upload)' });
    }

    // Convert base64 to buffer
    let fileBuffer;
    let mimeType = 'image/jpeg'; // default

    if (base64String.includes('data:')) {
      // base64 with data URL format: data:image/png;base64,xxx
      const parts = base64String.split(';base64,');
      mimeType = parts[0].replace('data:', '');
      fileBuffer = Buffer.from(parts[1], 'base64');
    } else {
      // Plain base64
      fileBuffer = Buffer.from(base64String, 'base64');
    }

    // Validate file size (max 5MB)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size exceeds 5MB limit' });
    }

    // Get current profile picture URL to delete old one
    const currentProfile = await UserProfile.findOne({ where: { userid: userId } });
    if (currentProfile?.profilePictureUrl) {
      await deleteProfilePictureFromFirebase(currentProfile.profilePictureUrl);
    }

    // Upload to Firebase Storage
    const firestoreUrl = await uploadProfilePictureToFirebase(userId, fileBuffer, mimeType);

    // Store URL in database (not the image itself)
    const updated = await UserProfile.update(
      { profilePictureUrl: firestoreUrl },
      { where: { userid: userId }, returning: true }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({
      message: 'Profile picture updated successfully',
      profile: updated[1][0],
      pictureUrl: firestoreUrl,
    });
  } catch (error) {
    console.error('Error in uploadProfilePicture:', error);
    return res.status(500).json({
      message: error.message || 'Error uploading profile picture',
    });
  }
};

/**
 * Get notification preferences
 */
export const getNotificationPreferences = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let preferences = await NotificationPreferences.findOne({
      where: { userid: userId },
    });

    // Create default if doesn't exist
    if (!preferences) {
      preferences = await NotificationPreferences.create({
        userid: userId,
        pushNotifications: false,
        weeklyIntelReport: true,
        missionReminders: true,
        emailNotifications: true,
      });
    }

    return res.status(200).json(preferences);
  } catch (error) {
    console.error('Error in getNotificationPreferences:', error);
    return res.status(500).json({
      message: error.message || 'Error fetching notification preferences',
    });
  }
};

/**
 * Update notification preferences
 */
export const updateNotificationPreferences = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      pushNotifications,
      weeklyIntelReport,
      missionReminders,
      emailNotifications,
    } = req.body;

    // First, try to find existing preferences
    let preferences = await NotificationPreferences.findOne({
      where: { userid: userId },
    });

    // Create if doesn't exist
    if (!preferences) {
      preferences = await NotificationPreferences.create({
        userid: userId,
        pushNotifications: pushNotifications ?? false,
        weeklyIntelReport: weeklyIntelReport ?? true,
        missionReminders: missionReminders ?? true,
        emailNotifications: emailNotifications ?? true,
      });
    } else {
      // Update existing
      const allowedUpdates = {};
      if (pushNotifications !== undefined) allowedUpdates.pushNotifications = pushNotifications;
      if (weeklyIntelReport !== undefined) allowedUpdates.weeklyIntelReport = weeklyIntelReport;
      if (missionReminders !== undefined) allowedUpdates.missionReminders = missionReminders;
      if (emailNotifications !== undefined) allowedUpdates.emailNotifications = emailNotifications;

      preferences = await NotificationPreferences.update(allowedUpdates, {
        where: { userid: userId },
        returning: true,
      });
      preferences = preferences[1][0];
    }

    return res.status(200).json({
      message: 'Notification preferences updated successfully',
      preferences,
    });
  } catch (error) {
    console.error('Error in updateNotificationPreferences:', error);
    return res.status(500).json({
      message: error.message || 'Error updating notification preferences',
    });
  }
};

/**
 * Get account settings for settings page (with calculated calorie intake)
 */
export const getAccountSettings = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByPk(userId);
    const profile = await UserProfile.findOne({ where: { userid: userId } });
    const preferences = await NotificationPreferences.findOne({
      where: { userid: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Ensure daily calorie intake is calculated
    let dailyCalorieIntake = profile.dailyCalorieIntake;
    if (!dailyCalorieIntake || dailyCalorieIntake === null) {
      try {
        dailyCalorieIntake = calculateDailyCalorieIntake({
          weight: profile.weight,
          height: profile.height,
          age: profile.age,
          gender: profile.gender,
          activityLevel: profile.activityLevel,
          goal: profile.goal,
        });
        // Save it
        await UserProfile.update(
          { dailyCalorieIntake },
          { where: { userid: userId } }
        );
      } catch (calcError) {
        console.error('Error calculating daily calorie intake:', calcError);
      }
    }

    return res.status(200).json({
      user: {
        email: user.email,
        uid: user.userid,
      },
      profile: {
        ...profile.dataValues,
        dailyCalorieIntake,
      },
      preferences: preferences || {
        pushNotifications: false,
        weeklyIntelReport: true,
        missionReminders: true,
        emailNotifications: true,
      },
    });
  } catch (error) {
    console.error('Error in getAccountSettings:', error);
    return res.status(500).json({
      message: error.message || 'Error fetching account settings',
    });
  }
};
