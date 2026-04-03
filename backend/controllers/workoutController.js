import {
  createExercise,
  createWorkoutLog,
  deleteWorkoutLog,
  getWorkoutLogById,
  listExercises,
  createUserWorkoutPlan,
  listUserWorkoutPlans,
  listWorkoutLogs,
  listWorkoutPlans,
  updateWorkoutLog,
} from '../models/services.js';

const getUserId = (req) => req.user?.uid;

const sendUnauthorized = (res) => res.status(401).json({ message: 'Unauthorized' });

const sendNotFound = (res, message) => res.status(404).json({ message });

export const getExercises = async (req, res) => {
  try {
    const result = await listExercises(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getExercises:', error);
    return res.status(500).json({ message: 'Error fetching exercises' });
  }
};

export const addExercise = async (req, res) => {
  try {
    if (!req.body?.name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const exercise = await createExercise(req.body);
    return res.status(201).json({ message: 'Exercise created successfully', exercise });
  } catch (error) {
    console.error('Error in addExercise:', error);
    return res.status(500).json({ message: error.message || 'Error creating exercise' });
  }
};

export const getWorkoutPlans = async (req, res) => {
  try {
    const result = await listWorkoutPlans(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getWorkoutPlans:', error);
    return res.status(500).json({ message: 'Error fetching workout plans' });
  }
};

export const getUserWorkoutPlans = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listUserWorkoutPlans(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getUserWorkoutPlans:', error);
    return res.status(500).json({ message: 'Error fetching user workout plans' });
  }
};

export const createUserWorkoutPlanHandler = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const workoutPlan = await createUserWorkoutPlan(userId, req.body);

    return res.status(201).json({
      message: 'Workout plan created successfully',
      workoutPlan,
    });
  } catch (error) {
    console.error('Error in createUserWorkoutPlanHandler:', error);
    return res.status(500).json({ message: error.message || 'Error creating workout plan' });
  }
};

export const getWorkoutLogs = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listWorkoutLogs(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getWorkoutLogs:', error);
    return res.status(500).json({ message: 'Error fetching workout logs' });
  }
};

export const getWorkoutLog = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const workoutLog = await getWorkoutLogById(userId, req.params.id);

    if (!workoutLog) {
      return sendNotFound(res, 'Workout log not found');
    }

    return res.status(200).json(workoutLog);
  } catch (error) {
    console.error('Error in getWorkoutLog:', error);
    return res.status(500).json({ message: 'Error fetching workout log' });
  }
};

export const createWorkoutLogHandler = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const workoutLog = await createWorkoutLog(userId, req.body);
    return res.status(201).json({
      message: 'Workout log created successfully',
      workoutLog,
    });
  } catch (error) {
    console.error('Error in createWorkoutLogHandler:', error);
    return res.status(500).json({ message: error.message || 'Error creating workout log' });
  }
};

export const updateWorkoutLogHandler = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const workoutLog = await updateWorkoutLog(userId, req.params.id, req.body);

    if (!workoutLog) {
      return sendNotFound(res, 'Workout log not found');
    }

    return res.status(200).json({
      message: 'Workout log updated successfully',
      workoutLog,
    });
  } catch (error) {
    console.error('Error in updateWorkoutLogHandler:', error);
    return res.status(500).json({ message: error.message || 'Error updating workout log' });
  }
};

export const deleteWorkoutLogHandler = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const deleted = await deleteWorkoutLog(userId, req.params.id);

    if (!deleted) {
      return sendNotFound(res, 'Workout log not found');
    }

    return res.status(200).json({ message: 'Workout log deleted successfully' });
  } catch (error) {
    console.error('Error in deleteWorkoutLogHandler:', error);
    return res.status(500).json({ message: 'Error deleting workout log' });
  }
};
