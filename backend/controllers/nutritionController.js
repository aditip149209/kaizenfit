import {
  createFoodItem,
  createMealLog,
  createUserDietPlan,
  createWaterLog,
  deleteMealLog,
  deleteWaterLog,
  getMealLogById,
  getWaterLogById,
  listFoodItems,
  listMealLogs,
  listWaterLogs,
  updateMealLog,
  updateWaterLog,
} from '../models/services.js';

const getUserId = (req) => req.user?.uid;

const sendUnauthorized = (res) => res.status(401).json({ message: 'Unauthorized' });
const sendNotFound = (res, message) => res.status(404).json({ message });

export const getFoodItems = async (req, res) => {
  try {
    const userId = getUserId(req);
    const result = await listFoodItems({ userid: userId, ...req.query });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getFoodItems:', error);
    return res.status(500).json({ message: 'Error fetching food items' });
  }
};

export const addFoodItem = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.name || req.body?.calories == null) {
      return res.status(400).json({ message: 'name and calories are required' });
    }

    const foodItem = await createFoodItem(userId, {
      ...req.body,
      isGlobal: true,
    });
    return res.status(201).json({ message: 'Food item created successfully', foodItem });
  } catch (error) {
    console.error('Error in addFoodItem:', error);
    return res.status(500).json({ message: error.message || 'Error creating food item' });
  }
};

export const addUserDietPlan = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const dietPlan = await createUserDietPlan(userId, req.body);
    return res.status(201).json({ message: 'Diet plan created successfully', dietPlan });
  } catch (error) {
    console.error('Error in addUserDietPlan:', error);
    return res.status(500).json({ message: error.message || 'Error creating diet plan' });
  }
};

export const getMealLogs = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listMealLogs(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getMealLogs:', error);
    return res.status(500).json({ message: 'Error fetching meal logs' });
  }
};

export const getMealLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const mealLog = await getMealLogById(userId, req.params.id);

    if (!mealLog) {
      return sendNotFound(res, 'Meal log not found');
    }

    return res.status(200).json(mealLog);
  } catch (error) {
    console.error('Error in getMealLog:', error);
    return res.status(500).json({ message: 'Error fetching meal log' });
  }
};

export const addMealLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const { date, mealType, foodItemId } = req.body ?? {};

    if (!date || !mealType || !foodItemId) {
      return res.status(400).json({ message: 'date, mealType, and foodItemId are required' });
    }

    const mealLog = await createMealLog(userId, req.body);
    return res.status(201).json({ message: 'Meal log created successfully', mealLog });
  } catch (error) {
    console.error('Error in addMealLog:', error);
    return res.status(500).json({ message: error.message || 'Error creating meal log' });
  }
};

export const modifyMealLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const mealLog = await updateMealLog(userId, req.params.id, req.body);

    if (!mealLog) {
      return sendNotFound(res, 'Meal log not found');
    }

    return res.status(200).json({ message: 'Meal log updated successfully', mealLog });
  } catch (error) {
    console.error('Error in modifyMealLog:', error);
    return res.status(500).json({ message: error.message || 'Error updating meal log' });
  }
};

export const removeMealLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const deleted = await deleteMealLog(userId, req.params.id);

    if (!deleted) {
      return sendNotFound(res, 'Meal log not found');
    }

    return res.status(200).json({ message: 'Meal log deleted successfully' });
  } catch (error) {
    console.error('Error in removeMealLog:', error);
    return res.status(500).json({ message: 'Error deleting meal log' });
  }
};

export const getWaterLogs = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listWaterLogs(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getWaterLogs:', error);
    return res.status(500).json({ message: 'Error fetching water logs' });
  }
};

export const getWaterLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const waterLog = await getWaterLogById(userId, req.params.id);

    if (!waterLog) {
      return sendNotFound(res, 'Water log not found');
    }

    return res.status(200).json(waterLog);
  } catch (error) {
    console.error('Error in getWaterLog:', error);
    return res.status(500).json({ message: 'Error fetching water log' });
  }
};

export const addWaterLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.date || req.body?.amount == null) {
      return res.status(400).json({ message: 'date and amount are required' });
    }

    const waterLog = await createWaterLog(userId, req.body);
    return res.status(201).json({ message: 'Water log created successfully', waterLog });
  } catch (error) {
    console.error('Error in addWaterLog:', error);
    return res.status(500).json({ message: error.message || 'Error creating water log' });
  }
};

export const modifyWaterLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const waterLog = await updateWaterLog(userId, req.params.id, req.body);

    if (!waterLog) {
      return sendNotFound(res, 'Water log not found');
    }

    return res.status(200).json({ message: 'Water log updated successfully', waterLog });
  } catch (error) {
    console.error('Error in modifyWaterLog:', error);
    return res.status(500).json({ message: error.message || 'Error updating water log' });
  }
};

export const removeWaterLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const deleted = await deleteWaterLog(userId, req.params.id);

    if (!deleted) {
      return sendNotFound(res, 'Water log not found');
    }

    return res.status(200).json({ message: 'Water log deleted successfully' });
  } catch (error) {
    console.error('Error in removeWaterLog:', error);
    return res.status(500).json({ message: 'Error deleting water log' });
  }
};
