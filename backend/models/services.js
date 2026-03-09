import { User, WorkoutLog, WorkoutPlanExercise, UserProfile, WaterLog, UserGoal, TransformationJournal, DietPlan, FoodItem, DietPlanFoodItem, UserDietPlan
    ,UserDietPlanFoodItem, UserWorkoutPlan, Tiers, Payments, Subscriptions, WorkoutPlan
} from '../models/User.js'

import db from '../config/db.js'
import { Op } from 'sequelize'

export const getUserById = async(userid) => {
    try {
    // findByPk is the most efficient way to get an item by its primary key
    const user = await User.findByPk(userid);
    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw new Error('Error fetching user.');
  }
}

export const createUser = async(userId, email) => {
  try {
    const newUser = await User.create({
      userid: userId,
      email: email
    })
    return newUser;
  }
  catch (error) {
    if(error.name == 'SequelizeUniqueConstraintError'){
      console.log("User already exists, skipping creation. ");
      return User.getUserById(userId);
    }
    console.error('Error in creating new user: ', error);
    throw new Error('Database initialization failed')
  }

}

const getUserProfile = async(userid) => {
    try {
    // findOne is perfect for finding a single record based on a condition
    const userProfile = await UserProfile.findOne({ where: { userid } });
    return userProfile;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw new Error('Error fetching user profile.');
  }
}

export const createUserProfile = async(userid, profileData) => {
  try {
    const { gender, height, heightType, weight, weightType, goal, activityLevel, injuries } = profileData;
    
    // Check if profile already exists
    const existingProfile = await UserProfile.findOne({ where: { userid } });
    
    if (existingProfile) {
      // Update existing profile
      await existingProfile.update({
        gender,
        height,
        heightType,
        weight,
        weightType,
        goal,
        activityLevel,
        injuries
      });
      return existingProfile;
    }
    
    // Create new profile
    const newProfile = await UserProfile.create({
      userid,
      gender,
      height,
      heightType,
      weight,
      weightType,
      goal,
      activityLevel,
      injuries
    });
    
    return newProfile;
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    throw new Error('Error creating user profile.');
  }
}

export const updateUserOnboardStatus = async(userid, isOnboarded) => {
  try {
    const user = await User.findByPk(userid);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    await user.update({ isOnboarded });
    return user;
  } catch (error) {
    console.error('Error in updateUserOnboardStatus:', error);
    throw new Error('Error updating onboarding status.');
  }
}





