import {
  CommunityChallenge,
  CommunityChallengeProgress,
  CommunityPost,
  Exercise,
  ExerciseLog,
  FoodItem,
  HealthData,
  MealLog,
  Subscriptions,
  Tiers,
  TransformationJournal,
  TransformationReport,
  User,
  UserGoal,
  UserProfile,
  UserWorkoutPlan,
  WaterLog,
  WorkoutLog,
  WorkoutPlan,
} from '../models/User.js';

import { db } from '../config/db.js';
import { Op } from 'sequelize';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizePagination = ({ limit, offset }) => ({
  limit: Math.min(toInt(limit, DEFAULT_LIMIT), MAX_LIMIT),
  offset: Math.max(toInt(offset, 0), 0),
});

const buildDateFilter = ({ from, to }) => {
  const dateFilter = {};

  if (from && to) {
    dateFilter[Op.between] = [from, to];
  } else if (from) {
    dateFilter[Op.gte] = from;
  } else if (to) {
    dateFilter[Op.lte] = to;
  }

  return Object.keys(dateFilter).length > 0 ? dateFilter : undefined;
};

const toDateOnly = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWindowStartDate = (reportType) => {
  const now = new Date();
  const start = new Date(now);

  if (reportType === 'daily') {
    start.setDate(now.getDate() - 1);
  } else if (reportType === 'monthly') {
    start.setDate(now.getDate() - 30);
  } else {
    start.setDate(now.getDate() - 7);
  }

  start.setHours(0, 0, 0, 0);
  return start;
};

const ownedWhere = (userid, extraWhere = {}) => ({
  userid,
  ...extraWhere,
});

const dateOnly = (date = new Date()) => date.toISOString().slice(0, 10);

const startOfWeekMonday = (date = new Date()) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = (day + 6) % 7;
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const endOfWeekSunday = (date = new Date()) => {
  const end = startOfWeekMonday(date);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

const toOperatorName = (email, fallback = 'OPERATOR') => {
  if (!email || typeof email !== 'string') {
    return fallback;
  }

  return email.split('@')[0].toUpperCase();
};

const buildDefaultChallenge = () => {
  const start = startOfWeekMonday();
  const end = endOfWeekSunday();

  return {
    title: 'PROTOCOL: 500 PUSHUPS',
    targetReps: 500,
    rewardXp: 500,
    startDate: dateOnly(start),
    endDate: dateOnly(end),
    isActive: true,
  };
};

const ensureActiveCommunityChallenge = async () => {
  const today = dateOnly();

  let challenge = await CommunityChallenge.findOne({
    where: {
      isActive: true,
      startDate: { [Op.lte]: today },
      endDate: { [Op.gte]: today },
    },
    order: [['createdAt', 'DESC']],
  });

  if (challenge) {
    return challenge;
  }

  challenge = await CommunityChallenge.create(buildDefaultChallenge());
  return challenge;
};

const replaceExerciseLogs = async (workoutLogId, exerciseEntries, transaction) => {
  await ExerciseLog.destroy({
    where: { workoutLogId },
    transaction,
  });

  if (!Array.isArray(exerciseEntries) || exerciseEntries.length === 0) {
    return [];
  }

  const records = exerciseEntries
    .filter((entry) => entry && entry.exerciseId)
    .map((entry) => ({
      workoutLogId,
      exerciseId: entry.exerciseId,
      sets: entry.sets ?? null,
      reps: entry.reps ?? null,
      weight: entry.weight ?? null,
      duration: entry.duration ?? null,
    }));

  if (records.length === 0) {
    return [];
  }

  return ExerciseLog.bulkCreate(records, { transaction });
};

export const getUserById = async (userid) => {
  try {
    return await User.findByPk(userid);
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw new Error('Error fetching user.');
  }
};

export const createUser = async (userId, email) => {
  try {
    return await User.create({
      userid: userId,
      email,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return getUserById(userId);
    }

    console.error('Error in creating new user:', error);
    throw new Error('Database initialization failed');
  }
};

export const getUserProfile = async (userid) => {
  try {
    return await UserProfile.findOne({ where: { userid } });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw new Error('Error fetching user profile.');
  }
};

export const createUserProfile = async (userid, profileData) => {
  try {
    const { gender, height, heightType, weight, weightType, goal, activityLevel, injuries } = profileData;

    const existingProfile = await UserProfile.findOne({ where: { userid } });

    if (existingProfile) {
      await existingProfile.update({
        gender,
        height,
        heightType,
        weight,
        weightType,
        goal,
        activityLevel,
        injuries,
      });

      return existingProfile;
    }

    return await UserProfile.create({
      userid,
      gender,
      height,
      heightType,
      weight,
      weightType,
      goal,
      activityLevel,
      injuries,
    });
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    throw new Error('Error creating user profile.');
  }
};

export const updateUserOnboardStatus = async (userid, isOnboarded) => {
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
};

export const getUserDashboardProfile = async (userid) => {
  const [user, profile, subscription] = await Promise.all([
    getUserById(userid),
    getUserProfile(userid),
    Subscriptions.findOne({
      where: { userid },
      include: [{ model: Tiers }],
      order: [['startDate', 'DESC']],
    }),
  ]);

  return { user, profile, subscription };
};

export const listExercises = async ({ limit, offset, search, type }) => {
  const where = {};

  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }

  if (type) {
    where.exerciseType = type;
  }

  return Exercise.findAndCountAll({
    where,
    order: [['name', 'ASC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const createExercise = async (exerciseData) => {
  return Exercise.create({
    name: exerciseData.name,
    description: exerciseData.description ?? null,
    targetMuscleGroup: exerciseData.targetMuscleGroup ?? 'FullBody',
    exerciseType: exerciseData.exerciseType ?? 'Strength',
    videoUrl: exerciseData.videoUrl ?? null,
  });
};

export const listWorkoutPlans = async ({ limit, offset, difficulty }) => {
  const where = {};

  if (difficulty) {
    where.difficulty = difficulty;
  }

  return WorkoutPlan.findAndCountAll({
    where,
    include: [{ model: Exercise }],
    order: [['name', 'ASC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const listUserWorkoutPlans = async (userid, { limit, offset }) => {
  return UserWorkoutPlan.findAndCountAll({
    where: ownedWhere(userid),
    include: [{ model: Exercise }],
    order: [['createdAt', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const createUserWorkoutPlan = async (userid, planData) => {
  return UserWorkoutPlan.create({
    userid,
    name: planData.name,
    description: JSON.stringify({
      description: planData.description ?? '',
      duration: planData.duration ?? null,
      difficulty: planData.difficulty ?? null,
      exercises: planData.exercises ?? [],
    }),
  });
};

export const createWorkoutLog = async (userid, workoutData) => {
  const transaction = await db.transaction();

  try {
    const workoutLog = await WorkoutLog.create(
      {
        userid,
        date: workoutData.date ?? new Date(),
        notes: workoutData.notes ?? null,
        workoutPlanId: workoutData.workoutPlanId ?? null,
        userWorkoutId: workoutData.userWorkoutId ?? null,
      },
      { transaction }
    );

    const exerciseEntries = workoutData.exerciseEntries ?? workoutData.exercises ?? workoutData.exerciseLogs ?? [];
    await replaceExerciseLogs(workoutLog.id, exerciseEntries, transaction);

    await transaction.commit();

    return getWorkoutLogById(userid, workoutLog.id);
  } catch (error) {
    await transaction.rollback();
    console.error('Error in createWorkoutLog:', error);
    throw new Error('Error creating workout log.');
  }
};

export const listWorkoutLogs = async (userid, { limit, offset, from, to }) => {
  const dateFilter = buildDateFilter({ from, to });

  return WorkoutLog.findAndCountAll({
    where: ownedWhere(userid, dateFilter ? { date: dateFilter } : {}),
    include: [
      { model: WorkoutPlan },
      { model: UserWorkoutPlan },
      {
        model: ExerciseLog,
        include: [{ model: Exercise }],
      },
    ],
    order: [['date', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const getWorkoutLogById = async (userid, workoutLogId) => {
  return WorkoutLog.findOne({
    where: { id: workoutLogId, userid },
    include: [
      { model: WorkoutPlan },
      { model: UserWorkoutPlan },
      {
        model: ExerciseLog,
        include: [{ model: Exercise }],
      },
    ],
  });
};

export const updateWorkoutLog = async (userid, workoutLogId, workoutData) => {
  const transaction = await db.transaction();

  try {
    const workoutLog = await WorkoutLog.findOne({
      where: { id: workoutLogId, userid },
      transaction,
    });

    if (!workoutLog) {
      return null;
    }

    await workoutLog.update(
      {
        date: workoutData.date ?? workoutLog.date,
        notes: workoutData.notes ?? workoutLog.notes,
        workoutPlanId: workoutData.workoutPlanId ?? workoutLog.workoutPlanId,
        userWorkoutId: workoutData.userWorkoutId ?? workoutLog.userWorkoutId,
      },
      { transaction }
    );

    if (Array.isArray(workoutData.exerciseEntries) || Array.isArray(workoutData.exercises) || Array.isArray(workoutData.exerciseLogs)) {
      const exerciseEntries = workoutData.exerciseEntries ?? workoutData.exercises ?? workoutData.exerciseLogs ?? [];
      await replaceExerciseLogs(workoutLog.id, exerciseEntries, transaction);
    }

    await transaction.commit();

    return getWorkoutLogById(userid, workoutLogId);
  } catch (error) {
    await transaction.rollback();
    console.error('Error in updateWorkoutLog:', error);
    throw new Error('Error updating workout log.');
  }
};

export const deleteWorkoutLog = async (userid, workoutLogId) => {
  const workoutLog = await WorkoutLog.findOne({ where: { id: workoutLogId, userid } });

  if (!workoutLog) {
    return false;
  }

  await workoutLog.destroy();
  return true;
};

export const listFoodItems = async ({ userid, limit, offset, search }) => {
  const where = {};

  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }

  if (userid) {
    where[Op.or] = [{ userid }, { userid: null }];
  }

  return FoodItem.findAndCountAll({
    where,
    order: [['name', 'ASC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const createFoodItem = async (userid, foodData) => {
  return FoodItem.create({
    userid: foodData.isGlobal ? null : userid,
    name: foodData.name,
    calories: foodData.calories,
    protein: foodData.protein ?? null,
    carbs: foodData.carbs ?? null,
    fat: foodData.fat ?? null,
    servingUnit: foodData.servingUnit ?? null,
    servingSize: foodData.servingSize ?? null,
  });
};

export const createUserDietPlan = async (userid, planData) => {
  return UserDietPlan.create({
    userid,
    name: planData.name,
    description: JSON.stringify({
      goal: planData.goal ?? null,
      calorieTarget: planData.calorieTarget ?? null,
      proteinTarget: planData.proteinTarget ?? null,
      carbsTarget: planData.carbsTarget ?? null,
      fatsTarget: planData.fatsTarget ?? null,
      notes: planData.notes ?? '',
    }),
  });
};

export const createMealLog = async (userid, mealData) => {
  return MealLog.create({
    userid,
    date: mealData.date,
    mealType: mealData.mealType,
    quantity: mealData.quantity ?? 1,
    foodItemId: mealData.foodItemId,
  });
};

export const listMealLogs = async (userid, { limit, offset, from, to, mealType }) => {
  const where = ownedWhere(userid);

  const dateFilter = buildDateFilter({ from, to });
  if (dateFilter) {
    where.date = dateFilter;
  }

  if (mealType) {
    where.mealType = mealType;
  }

  return MealLog.findAndCountAll({
    where,
    include: [{ model: FoodItem }],
    order: [['date', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const getMealLogById = async (userid, mealLogId) => {
  return MealLog.findOne({
    where: { id: mealLogId, userid },
    include: [{ model: FoodItem }],
  });
};

export const updateMealLog = async (userid, mealLogId, mealData) => {
  const mealLog = await MealLog.findOne({ where: { id: mealLogId, userid } });

  if (!mealLog) {
    return null;
  }

  await mealLog.update({
    date: mealData.date ?? mealLog.date,
    mealType: mealData.mealType ?? mealLog.mealType,
    quantity: mealData.quantity ?? mealLog.quantity,
    foodItemId: mealData.foodItemId ?? mealLog.foodItemId,
  });

  return getMealLogById(userid, mealLogId);
};

export const deleteMealLog = async (userid, mealLogId) => {
  const mealLog = await MealLog.findOne({ where: { id: mealLogId, userid } });

  if (!mealLog) {
    return false;
  }

  await mealLog.destroy();
  return true;
};

export const createWaterLog = async (userid, waterData) => {
  return WaterLog.create({
    userid,
    date: waterData.date,
    amount: waterData.amount,
  });
};

export const listWaterLogs = async (userid, { limit, offset, from, to }) => {
  const dateFilter = buildDateFilter({ from, to });

  return WaterLog.findAndCountAll({
    where: ownedWhere(userid, dateFilter ? { date: dateFilter } : {}),
    order: [['date', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const getWaterLogById = async (userid, waterLogId) => {
  return WaterLog.findOne({ where: { id: waterLogId, userid } });
};

export const updateWaterLog = async (userid, waterLogId, waterData) => {
  const waterLog = await WaterLog.findOne({ where: { id: waterLogId, userid } });

  if (!waterLog) {
    return null;
  }

  await waterLog.update({
    date: waterData.date ?? waterLog.date,
    amount: waterData.amount ?? waterLog.amount,
  });

  return getWaterLogById(userid, waterLogId);
};

export const deleteWaterLog = async (userid, waterLogId) => {
  const waterLog = await WaterLog.findOne({ where: { id: waterLogId, userid } });

  if (!waterLog) {
    return false;
  }

  await waterLog.destroy();
  return true;
};

export const createUserGoal = async (userid, goalData) => {
  return UserGoal.create({
    userid,
    calorieGoal: goalData.calorieGoal ?? null,
    waterGoal: goalData.waterGoal ?? null,
    date: goalData.date ?? new Date(),
  });
};

export const listUserGoals = async (userid, { limit, offset }) => {
  return UserGoal.findAndCountAll({
    where: ownedWhere(userid),
    order: [['date', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const getCurrentUserGoal = async (userid) => {
  return UserGoal.findOne({
    where: ownedWhere(userid),
    order: [['date', 'DESC']],
  });
};

export const updateUserGoal = async (userid, goalId, goalData) => {
  const goal = await UserGoal.findOne({ where: { id: goalId, userid } });

  if (!goal) {
    return null;
  }

  await goal.update({
    calorieGoal: goalData.calorieGoal ?? goal.calorieGoal,
    waterGoal: goalData.waterGoal ?? goal.waterGoal,
    date: goalData.date ?? goal.date,
  });

  return goal;
};

export const deleteUserGoal = async (userid, goalId) => {
  const goal = await UserGoal.findOne({ where: { id: goalId, userid } });

  if (!goal) {
    return false;
  }

  await goal.destroy();
  return true;
};

export const createHealthData = async (userid, healthData) => {
  return HealthData.create({
    userid,
    date: healthData.date,
    heartRate: healthData.heartRate ?? null,
    sleepHours: healthData.sleepHours ?? null,
    bloodPressureSystolic: healthData.bloodPressureSystolic ?? null,
    bloodPressureDiastolic: healthData.bloodPressureDiastolic ?? null,
    weight: healthData.weight ?? null,
    bodyFat: healthData.bodyFat ?? null,
    muscleMass: healthData.muscleMass ?? null,
    waist: healthData.waist ?? null,
    chest: healthData.chest ?? null,
    arms: healthData.arms ?? null,
    thighs: healthData.thighs ?? null,
    notes: healthData.notes ?? null,
  });
};

export const listHealthData = async (userid, { limit, offset, from, to }) => {
  const dateFilter = buildDateFilter({ from, to });

  return HealthData.findAndCountAll({
    where: ownedWhere(userid, dateFilter ? { date: dateFilter } : {}),
    order: [['date', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const getHealthDataById = async (userid, healthDataId) => {
  return HealthData.findOne({ where: { id: healthDataId, userid } });
};

export const updateHealthData = async (userid, healthDataId, healthData) => {
  const record = await HealthData.findOne({ where: { id: healthDataId, userid } });

  if (!record) {
    return null;
  }

  await record.update({
    date: healthData.date ?? record.date,
    heartRate: healthData.heartRate ?? record.heartRate,
    sleepHours: healthData.sleepHours ?? record.sleepHours,
    bloodPressureSystolic: healthData.bloodPressureSystolic ?? record.bloodPressureSystolic,
    bloodPressureDiastolic: healthData.bloodPressureDiastolic ?? record.bloodPressureDiastolic,
    weight: healthData.weight ?? record.weight,
    bodyFat: healthData.bodyFat ?? record.bodyFat,
    muscleMass: healthData.muscleMass ?? record.muscleMass,
    waist: healthData.waist ?? record.waist,
    chest: healthData.chest ?? record.chest,
    arms: healthData.arms ?? record.arms,
    thighs: healthData.thighs ?? record.thighs,
    notes: healthData.notes ?? record.notes,
  });

  return getHealthDataById(userid, healthDataId);
};

export const deleteHealthData = async (userid, healthDataId) => {
  const record = await HealthData.findOne({ where: { id: healthDataId, userid } });

  if (!record) {
    return false;
  }

  await record.destroy();
  return true;
};

export const listTiers = async () => {
  const defaultTiers = [
    {
      name: 'Operative',
      price: 0,
      billingCycle: 'monthly',
      features: ['Access to Daily Mission', 'Basic Progress Tracking', 'Community Read-Only', 'Ad-Supported Experience'],
    },
    {
      name: 'Tactical',
      price: 19,
      billingCycle: 'monthly',
      features: ['Full Protocol Library', 'Advanced Biometrics', 'Squad Leaderboards', 'Nutrition Command Center', 'Ad-Free Interface'],
    },
    {
      name: 'Elite',
      price: 49,
      billingCycle: 'monthly',
      features: ['1-on-1 Human Coaching', 'Video Form Analysis', 'Custom Meal Prep Delivery', 'Priority Support Line', 'Exclusive Gear Drops'],
    },
  ];

  // Seed tiers in an idempotent way, keyed by tier name.
  await Promise.all(
    defaultTiers.map((tier) =>
      Tiers.findOrCreate({
        where: { name: tier.name },
        defaults: tier,
      })
    )
  );

  const allTiers = await Tiers.findAll({
    order: [['createdAt', 'ASC']],
  });

  const seenByName = new Set();
  const duplicateIds = [];

  for (const tier of allTiers) {
    const tierName = String(tier.name || '').toLowerCase();

    if (seenByName.has(tierName)) {
      duplicateIds.push(tier.id);
      continue;
    }

    seenByName.add(tierName);
  }

  if (duplicateIds.length > 0) {
    await Tiers.destroy({
      where: { id: { [Op.in]: duplicateIds } },
    });
  }

  return Tiers.findAll({
    order: [['price', 'ASC']],
  });
};

export const getCurrentSubscription = async (userid) => {
  return Subscriptions.findOne({
    where: { userid },
    include: [{ model: Tiers }],
    order: [['startDate', 'DESC']],
  });
};

const getNextBillingDate = (billingCycle) => {
  const current = new Date();
  const next = new Date(current);

  if (billingCycle === 'yearly') {
    next.setFullYear(current.getFullYear() + 1);
  } else if (billingCycle === 'one-time') {
    return null;
  } else {
    next.setMonth(current.getMonth() + 1);
  }

  return next;
};

export const upsertSubscription = async (userid, tierId) => {
  const tier = await Tiers.findByPk(tierId);

  if (!tier) {
    throw new Error('Tier not found');
  }

  const existing = await Subscriptions.findOne({ where: { userid } });
  const nextBillingDate = getNextBillingDate(tier.billingCycle);

  if (existing) {
    await existing.update({
      tierId,
      status: 'active',
      startDate: new Date(),
      nextBillingDate,
    });

    return getCurrentSubscription(userid);
  }

  await Subscriptions.create({
    userid,
    tierId,
    status: 'active',
    startDate: new Date(),
    nextBillingDate,
  });

  return getCurrentSubscription(userid);
};

export const cancelSubscription = async (userid) => {
  const subscription = await Subscriptions.findOne({ where: { userid } });

  if (!subscription) {
    return null;
  }

  await subscription.update({
    status: 'canceled',
    nextBillingDate: null,
  });

  return getCurrentSubscription(userid);
};

export const listCommunityPosts = async (userid, { limit, offset }) => {
  const result = await CommunityPost.findAndCountAll({
    order: [['createdAt', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });

  const rows = result.rows.map((post) => {
    const raw = post.toJSON();
    const likedBy = Array.isArray(raw.likedBy) ? raw.likedBy : [];

    return {
      ...raw,
      likedByMe: likedBy.includes(userid),
    };
  });

  return {
    count: result.count,
    rows,
  };
};

export const createCommunityPost = async (userid, postData) => {
  const created = await CommunityPost.create({
    userid,
    author: postData.author,
    badge: postData.badge,
    content: postData.content,
    likes: 0,
    likedBy: [],
  });

  const raw = created.toJSON();
  return {
    ...raw,
    likedByMe: false,
  };
};

export const toggleCommunityPostLike = async (userid, postId) => {
  const post = await CommunityPost.findByPk(postId);

  if (!post) {
    return null;
  }

  const likedBy = Array.isArray(post.likedBy) ? [...post.likedBy] : [];
  const index = likedBy.indexOf(userid);

  if (index >= 0) {
    likedBy.splice(index, 1);
  } else {
    likedBy.push(userid);
  }

  await post.update({
    likedBy,
    likes: likedBy.length,
  });

  const raw = post.toJSON();
  return {
    ...raw,
    likedByMe: likedBy.includes(userid),
  };
};

export const getCommunityLeaderboard = async (currentUserId, { limit } = {}) => {
  const safeLimit = Math.min(toInt(limit, 10), 50);

  const [users, postStats, challengeStats] = await Promise.all([
    User.findAll({ attributes: ['userid', 'email'] }),
    CommunityPost.findAll({ attributes: ['userid', 'likes'] }),
    CommunityChallengeProgress.findAll({ attributes: ['userid', 'xp'] }),
  ]);

  const byUser = new Map();

  users.forEach((user) => {
    byUser.set(user.userid, {
      userid: user.userid,
      name: toOperatorName(user.email),
      respectReceived: 0,
      challengeXp: 0,
      totalXp: 0,
      isCurrentUser: user.userid === currentUserId,
    });
  });

  postStats.forEach((post) => {
    if (!post.userid) {
      return;
    }

    const row = byUser.get(post.userid);
    if (!row) {
      return;
    }

    row.respectReceived += Number(post.likes ?? 0);
  });

  challengeStats.forEach((progress) => {
    if (!progress.userid) {
      return;
    }

    const row = byUser.get(progress.userid);
    if (!row) {
      return;
    }

    row.challengeXp += Number(progress.xp ?? 0);
  });

  const rows = Array.from(byUser.values())
    .map((row) => ({
      ...row,
      totalXp: row.challengeXp + (row.respectReceived * 10),
    }))
    .sort((a, b) => b.totalXp - a.totalXp)
    .slice(0, safeLimit)
    .map((row, index) => ({
      rank: index + 1,
      ...row,
    }));

  return { rows };
};

export const getCurrentCommunityChallenge = async (userid) => {
  const challenge = await ensureActiveCommunityChallenge();

  const progress = await CommunityChallengeProgress.findOne({
    where: {
      userid,
      challengeId: challenge.id,
    },
  });

  const reps = Number(progress?.reps ?? 0);
  const targetReps = Number(challenge.targetReps ?? 1);
  const progressPct = Math.max(0, Math.min(100, Math.round((reps / Math.max(targetReps, 1)) * 100)));

  return {
    challenge,
    progress: {
      reps,
      xp: Number(progress?.xp ?? 0),
      progressPct,
    },
  };
};

export const logCommunityChallengeReps = async (userid, { reps }) => {
  const challenge = await ensureActiveCommunityChallenge();
  const addReps = Math.max(1, toInt(reps, 0));

  const [progress] = await CommunityChallengeProgress.findOrCreate({
    where: {
      userid,
      challengeId: challenge.id,
    },
    defaults: {
      reps: 0,
      xp: 0,
    },
  });

  const updatedReps = Number(progress.reps ?? 0) + addReps;
  const targetReps = Number(challenge.targetReps ?? 1);
  const updatedXp = Math.min(Number(challenge.rewardXp ?? 0), Math.round((updatedReps / Math.max(targetReps, 1)) * Number(challenge.rewardXp ?? 0)));

  await progress.update({
    reps: updatedReps,
    xp: updatedXp,
  });

  return getCurrentCommunityChallenge(userid);
};

export const listTransformationJournals = async (userid, { limit, offset }) => {
  return TransformationJournal.findAndCountAll({
    where: ownedWhere(userid),
    order: [['date', 'DESC']],
    ...normalizePagination({ limit, offset }),
  });
};

export const createTransformationJournal = async (userid, journalData) => {
  return TransformationJournal.create({
    userid,
    title: journalData.title,
    content: JSON.stringify({
      reportType: journalData.reportType ?? null,
      includeMetrics: journalData.includeMetrics ?? false,
      includeNutrition: journalData.includeNutrition ?? false,
      includeWorkouts: journalData.includeWorkouts ?? false,
      dataWindow: journalData.dataWindow ?? null,
      recordCounts: journalData.recordCounts ?? null,
    }),
  });
};

export const getTransformationJournalById = async (userid, journalId) => {
  return TransformationJournal.findOne({
    where: { id: journalId, userid },
  });
};

export const createTransformationReport = async (userid, reportData) => {
  return TransformationReport.create({
    userid,
    journalId: reportData.journalId,
    reportType: reportData.reportType,
    content: reportData.content,
    payloadMeta: reportData.payloadMeta ?? null,
  });
};

export const getTransformationReportById = async (userid, reportId) => {
  return TransformationReport.findOne({
    where: {
      id: reportId,
      userid,
    },
    include: [{
      model: TransformationJournal,
      required: false,
      attributes: ['id', 'title', 'createdAt'],
    }],
  });
};

export const listTransformationJournalsWithReports = async (userid, { limit, offset }) => {
  return TransformationJournal.findAndCountAll({
    where: ownedWhere(userid),
    include: [{
      model: TransformationReport,
      required: false,
    }],
    order: [
      ['date', 'DESC'],
      [TransformationReport, 'createdAt', 'DESC'],
    ],
    ...normalizePagination({ limit, offset }),
  });
};

export const buildTransformationDraftText = ({ payload }) => {
  const reportType = payload?.reportType ?? 'weekly';
  const dataWindow = payload?.dataWindow ?? {};
  const counts = payload?.recordCounts ?? {};
  const filters = payload?.filters ?? {};

  const lines = [
    `INTEL REPORT (${String(reportType).toUpperCase()})`,
    `Window: ${dataWindow.from ?? '-'} to ${dataWindow.to ?? '-'}`,
    '',
    'Included Sections:',
    `- Metrics: ${filters.includeMetrics ? 'YES' : 'NO'} (${counts.metrics ?? 0} records)`,
    `- Nutrition: ${filters.includeNutrition ? 'YES' : 'NO'} (${(counts.mealLogs ?? 0) + (counts.waterLogs ?? 0)} records)`,
    `- Workouts: ${filters.includeWorkouts ? 'YES' : 'NO'} (${counts.workoutLogs ?? 0} workouts, ${counts.exerciseLogs ?? 0} exercises)`,
    '',
    'Draft Insight:',
    'Data payload generated successfully and is ready to send to the LLM API.',
    'Once LLM integration is wired, replace this draft section with model output.',
  ];

  return lines.join('\n');
};

export const buildTransformationPayload = async (userid, reportConfig) => {
  const reportType = ['daily', 'weekly', 'monthly'].includes(String(reportConfig?.reportType))
    ? String(reportConfig.reportType)
    : 'weekly';

  const includeMetrics = Boolean(reportConfig?.includeMetrics);
  const includeNutrition = Boolean(reportConfig?.includeNutrition);
  const includeWorkouts = Boolean(reportConfig?.includeWorkouts);

  const windowStart = getWindowStartDate(reportType);
  const windowEnd = new Date();
  const fromDateOnly = toDateOnly(windowStart);
  const toDateOnlyValue = toDateOnly(windowEnd);

  const payload = {
    reportType,
    filters: {
      includeMetrics,
      includeNutrition,
      includeWorkouts,
    },
    dataWindow: {
      from: fromDateOnly,
      to: toDateOnlyValue,
    },
    data: {},
    recordCounts: {
      metrics: 0,
      mealLogs: 0,
      waterLogs: 0,
      workoutLogs: 0,
      exerciseLogs: 0,
    },
  };

  if (includeMetrics) {
    const metrics = await HealthData.findAll({
      where: {
        userid,
        date: {
          [Op.between]: [windowStart, windowEnd],
        },
      },
      order: [['date', 'ASC']],
    });

    payload.data.metrics = metrics.map((row) => row.toJSON());
    payload.recordCounts.metrics = metrics.length;
  }

  if (includeNutrition) {
    const [mealLogs, waterLogs] = await Promise.all([
      MealLog.findAll({
        where: {
          userid,
          date: {
            [Op.between]: [fromDateOnly, toDateOnlyValue],
          },
        },
        include: [{ model: FoodItem }],
        order: [['date', 'ASC']],
      }),
      WaterLog.findAll({
        where: {
          userid,
          date: {
            [Op.between]: [fromDateOnly, toDateOnlyValue],
          },
        },
        order: [['date', 'ASC']],
      }),
    ]);

    payload.data.nutrition = {
      mealLogs: mealLogs.map((row) => row.toJSON()),
      waterLogs: waterLogs.map((row) => row.toJSON()),
    };

    payload.recordCounts.mealLogs = mealLogs.length;
    payload.recordCounts.waterLogs = waterLogs.length;
  }

  if (includeWorkouts) {
    const workoutLogs = await WorkoutLog.findAll({
      where: {
        userid,
        date: {
          [Op.between]: [windowStart, windowEnd],
        },
      },
      include: [
        { model: WorkoutPlan },
        { model: UserWorkoutPlan },
        {
          model: ExerciseLog,
          include: [{ model: Exercise }],
        },
      ],
      order: [['date', 'ASC']],
    });

    const exerciseLogCount = workoutLogs.reduce(
      (sum, row) => sum + (Array.isArray(row.ExerciseLogs) ? row.ExerciseLogs.length : 0),
      0
    );

    payload.data.workouts = {
      workoutLogs: workoutLogs.map((row) => row.toJSON()),
    };

    payload.recordCounts.workoutLogs = workoutLogs.length;
    payload.recordCounts.exerciseLogs = exerciseLogCount;
  }

  return payload;
};





