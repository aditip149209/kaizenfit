/**
 * Calculate daily calorie intake based on Harris-Benedict equation
 * Uses BMR (Basal Metabolic Rate) multiplied by activity factor
 */

/**
 * Calculate BMR using Harris-Benedict formula (revised 1984)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories per day
 */
export const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    // Male: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    // Female: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)
    return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  }
};

/**
 * Get activity multiplier based on activity level
 * @param {string} activityLevel - Activity level (sedentary, light, moderate, active, very_active)
 * @returns {number} Activity multiplier
 */
export const getActivityMultiplier = (activityLevel) => {
  const multipliers = {
    sedentary: 1.2,        // Little to no exercise
    light: 1.375,          // 1-3 days per week
    moderate: 1.55,        // 3-5 days per week
    active: 1.725,         // 6-7 days per week
    very_active: 1.9,      // Twice per day or heavy workouts
  };
  return multipliers[activityLevel] || 1.55; // Default to moderate
};

/**
 * Calculate daily calorie intake
 * @param {object} userProfile - User profile with weight, height, age, gender, activityLevel, goal
 * @returns {number} Recommended daily calorie intake
 */
export const calculateDailyCalorieIntake = (userProfile) => {
  const { weight, height, age, gender, activityLevel, goal } = userProfile;

  // Validate inputs
  if (!weight || !height || !age || !gender || !activityLevel) {
    throw new Error('Missing required fields for calorie calculation');
  }

  const bmr = calculateBMR(weight, height, age, gender);
  const activityMultiplier = getActivityMultiplier(activityLevel);
  let tdee = bmr * activityMultiplier; // Total Daily Energy Expenditure

  // Adjust based on goal
  if (goal === 'lose_weight') {
    tdee = tdee * 0.85; // 15% deficit
  } else if (goal === 'gain_muscle') {
    tdee = tdee * 1.1; // 10% surplus
  }
  // 'maintain_weight' and 'improve_fitness' use baseline TDEE

  return Math.round(tdee);
};

/**
 * Convert height from inches to cm
 * @param {number} inches
 * @returns {number} Height in cm
 */
export const inchesToCm = (inches) => {
  return Math.round(inches * 2.54);
};

/**
 * Convert weight from lbs to kg
 * @param {number} lbs
 * @returns {number} Weight in kg
 */
export const lbsToKg = (lbs) => {
  return (lbs / 2.205).toFixed(2);
};
