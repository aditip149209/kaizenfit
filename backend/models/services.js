import { User, WorkoutLog, WorkoutPlanExercise, UserProfile, WaterLog, UserGoal, TransformationJournal, DietPlan, FoodItem, DietPlanFoodItem, UserDietPlan
    ,UserDietPlanFoodItem, UserWorkoutPlan, Tiers, Payments, Subscriptions, WorkoutPlan
} from '../models/User.js'

import db from '../config/db.js'
import { Op } from 'sequelize'

const getUserById = async(userid) => {
    try {
    // findByPk is the most efficient way to get an item by its primary key
    const user = await User.findByPk(userid);
    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw new Error('Error fetching user.');
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

const getUserWorkouts = async(userid) => {
    try {
    // findAll gets all records matching the 'where' clause
    // 'include' automatically joins the Exercise table using your join table
    const userWorkouts = await UserWorkoutPlan.findAll({
      where: { userid },
      include: [
        {
          model: Exercise,
          through: { attributes: ['sets', 'reps'] }, // Get join table attributes
        },
      ],
    });
    return userWorkouts;
  } catch (error) {
    console.error('Error in getUserWorkouts:', error);
    throw new Error('Error fetching user workouts.');
  }
}

const getUserDietPlan = async(userid) => {
    try {
    const userDietPlans = await UserDietPlan.findAll({
      where: { userid },
      include: [
        {
          model: FoodItem,
          through: { attributes: [] }, // We don't need any join table data
        },
      ],
    });
    return userDietPlans;
  } catch (error) {
    console.error('Error in getUserDietPlan:', error);
    throw new Error('Error fetching user diet plans.');
  }

}

const getLatestUserGoal = async(userid) => {
    try {
    // We find one, but order by date descending to get the *latest* goal
    const userGoal = await UserGoal.findOne({
      where: { userid },
      order: [['date', 'DESC']],
    });
    return userGoal;
  } catch (error) {
    console.error('Error in getLatestUserGoal:', error);
    throw new Error('Error fetching user goal.');
  }
}


const getWorkouts = async() => {
    try {
    // No 'where' clause means we get all of them
    // Include exercises to show what's in each plan
    const workoutPlans = await WorkoutPlan.findAll({
      include: [
        {
          model: Exercise,
          through: { attributes: ['sets', 'reps', 'rest'] },
        },
      ],
    });
    return workoutPlans;
  } catch (error) {
    console.error('Error in getWorkouts:', error);
    throw new Error('Error fetching workout plans.');
  }
}

const getDietPlans = async() => {
    try {
    const dietPlans = await DietPlan.findAll({
      include: [
        {
          model: FoodItem,
          through: { attributes: ['mealSuggestion'] },
        },
      ],
    });
    return dietPlans;
  } catch (error) {
    console.error('Error in getDietPlans:', error);
    throw new Error('Error fetching diet plans.');
  }

}

const currentJournals = async(userid) => {
    try {
    const journals = await TransformationJournal.findAll({
      where: { userid },
      order: [['date', 'DESC']],
    });
    return journals;
  } catch (error) {
    console.error('Error in currentJournals:', error);
    throw new Error('Error fetching journals.');
  }
}

const onboardUserProfile = async(userid, data) => {
    const t = await db.transaction();
  try {
    // Upsert = Update or Insert.
    // It will create the profile if it doesn't exist, or update it if it does.
    const [userProfile] = await UserProfile.upsert(
      { ...data, userid: userid },
      { transaction: t }
    );

    // After profile is saved, mark the user as onboarded
    await User.update(
      { isOnboarded: true },
      { where: { userid: userid }, transaction: t }
    );

    // If both operations succeed, commit the transaction
    await t.commit();
    return userProfile;
  } catch (error) {
    // If anything fails, roll back all changes
    await t.rollback();
    console.error('Error in onboardUserProfile:', error);
    throw new Error('Error onboarding user.');
  }
};

export const createUserFirst = async (userid, data) => {
  try {
    // findOrCreate prevents duplicate users if this is called twice.
    // It returns the user and a boolean 'created'
    const [user] = await User.findOrCreate({
      where: { userid: userid },
      defaults: {
        email: data.email,
        isOnboarded: false,
      },
    });
    return user;
  } catch (error) {
    console.error('Error in createUserFirst:', error);
    throw new Error('Error creating user.');
  }
};

/**
 * Logs a new meal in the MealLog.
 * @param {string} userid - The UUID of the user.
 * @param {object} mealData - { foodItemId, date, mealType, quantity }
 * @returns {Promise<MealLog>} The created MealLog instance.
 */
export const logMeal = async (userid, mealData) => {
  try {
    // 'create' is the standard way to insert a new row
    const newMeal = await MealLog.create({
      ...mealData,
      userid: userid, // Ensure the userid is added to the data
    });
    return newMeal;
  } catch (error) {
    console.error('Error in logMeal:', error);
    throw new Error('Error logging meal.');
  }
};


export const logWater = async (userid, waterData) => {
  try {
    // findOrCreate tries to find a log for this user on this date
    const [waterLog, created] = await WaterLog.findOrCreate({
      where: {
        userid: userid,
        date: waterData.date, // '2025-11-15'
      },
      defaults: {
        amount: waterData.amount,
      },
    });

    if (!created) {
      // If the log was found (not created), add the new amount to the old
      await waterLog.increment('amount', { by: waterData.amount });
    }

    return waterLog;
  } catch (error) {
    console.error('Error in logWater:', error);
    throw new Error('Error logging water.');
  }
};


export const getWorkoutHistory = async (userid) => {
  try {
    const history = await WorkoutLog.findAll({
      where: { userid },
      order: [['date', 'DESC']],
      include: [
        {
          model: ExerciseLog,
          include: [{ model: Exercise }], // Include details of the exercise
        },
        { model: WorkoutPlan }, // Info about the plan they followed
        { model: UserWorkoutPlan }, // Info about the custom plan they followed
      ],
    });
    return history;
  } catch (error) {
    console.error('Error in getWorkoutHistory:', error);
    throw new Error('Error fetching workout history.');
  }
};

export const getMealLogByDate = async (userid, date) => {
  try {
    const meals = await MealLog.findAll({
      where: {
        userid: userid,
        date: date,
      },
      include: [{ model: FoodItem }], // Include all food item details
    });
    return meals;
  } catch (error) {
    console.error('Error in getMealLogByDate:', error);
    throw new Error('Error fetching meal log.');
  }
};


