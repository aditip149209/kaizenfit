import {
  buildTransformationPayload,
  buildTransformationDraftText,
  createHealthData,
  createTransformationReport,
  createTransformationJournal,
  createUserGoal,
  deleteHealthData,
  deleteUserGoal,
  getTransformationJournalById,
  getTransformationReportById,
  getCurrentUserGoal,
  getHealthDataById,
  getUserProfile,
  listHealthData,
  listTransformationJournalsWithReports,
  listUserGoals,
  updateHealthData,
  updateUserGoal,
} from '../models/services.js';

const getUserId = (req) => req.user?.uid;
const sendUnauthorized = (res) => res.status(401).json({ message: 'Unauthorized' });
const sendNotFound = (res, message) => res.status(404).json({ message });

const toKg = (weight, weightType) => {
  if (weight == null) {
    return null;
  }

  const numericWeight = Number(weight);
  if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
    return null;
  }

  if (String(weightType).toLowerCase() === 'lb') {
    return numericWeight * 0.453592;
  }

  return numericWeight;
};

const toCm = (height, heightType) => {
  if (height == null) {
    return null;
  }

  const numericHeight = Number(height);
  if (!Number.isFinite(numericHeight) || numericHeight <= 0) {
    return null;
  }

  if (String(heightType).toLowerCase() === 'inch') {
    return numericHeight * 2.54;
  }

  return numericHeight;
};

const activityFactorByLevel = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const goalAdjustmentByType = {
  lose_weight: -350,
  gain_muscle: 300,
  maintain_weight: 0,
  improve_fitness: 0,
};

const calculateCalorieTargetFromProfile = (profile) => {
  const weightKg = toKg(profile?.weight, profile?.weightType);
  const heightCm = toCm(profile?.height, profile?.heightType);
  const activityFactor = activityFactorByLevel[String(profile?.activityLevel)] ?? 1.2;
  const goalAdjustment = goalAdjustmentByType[String(profile?.goal)] ?? 0;

  if (weightKg == null || heightCm == null) {
    return null;
  }

  // Mifflin-St Jeor baseline with a conservative age fallback since age is not in profile.
  const assumedAge = 30;
  const gender = String(profile?.gender ?? '').toLowerCase();
  const sexOffset = gender === 'female' ? -161 : 5;
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * assumedAge) + sexOffset;
  const estimatedTdee = bmr * activityFactor;
  const adjustedTarget = estimatedTdee + goalAdjustment;

  return Math.max(1200, Math.round(adjustedTarget));
};

export const getGoals = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listUserGoals(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getGoals:', error);
    return res.status(500).json({ message: 'Error fetching goals' });
  }
};

export const getCurrentGoal = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const goal = await getCurrentUserGoal(userId);

    if (goal?.calorieGoal != null) {
      return res.status(200).json(goal);
    }

    const profile = await getUserProfile(userId);
    const inferredCalorieGoal = calculateCalorieTargetFromProfile(profile);

    if (!goal) {
      return res.status(200).json({
        id: null,
        userid: userId,
        calorieGoal: inferredCalorieGoal,
        waterGoal: null,
        date: null,
        inferred: true,
      });
    }

    return res.status(200).json({
      ...goal.toJSON(),
      calorieGoal: inferredCalorieGoal,
      inferred: true,
    });
  } catch (error) {
    console.error('Error in getCurrentGoal:', error);
    return res.status(500).json({ message: 'Error fetching current goal' });
  }
};

export const addGoal = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const goal = await createUserGoal(userId, req.body);
    return res.status(201).json({ message: 'Goal created successfully', goal });
  } catch (error) {
    console.error('Error in addGoal:', error);
    return res.status(500).json({ message: error.message || 'Error creating goal' });
  }
};

export const modifyGoal = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const goal = await updateUserGoal(userId, req.params.id, req.body);

    if (!goal) {
      return sendNotFound(res, 'Goal not found');
    }

    return res.status(200).json({ message: 'Goal updated successfully', goal });
  } catch (error) {
    console.error('Error in modifyGoal:', error);
    return res.status(500).json({ message: error.message || 'Error updating goal' });
  }
};

export const removeGoal = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const deleted = await deleteUserGoal(userId, req.params.id);

    if (!deleted) {
      return sendNotFound(res, 'Goal not found');
    }

    return res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error in removeGoal:', error);
    return res.status(500).json({ message: 'Error deleting goal' });
  }
};

export const getHealthRecords = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listHealthData(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getHealthRecords:', error);
    return res.status(500).json({ message: 'Error fetching health data' });
  }
};

export const getHealthRecord = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const record = await getHealthDataById(userId, req.params.id);

    if (!record) {
      return sendNotFound(res, 'Health record not found');
    }

    return res.status(200).json(record);
  } catch (error) {
    console.error('Error in getHealthRecord:', error);
    return res.status(500).json({ message: 'Error fetching health record' });
  }
};

export const addHealthRecord = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.date) {
      return res.status(400).json({ message: 'date is required' });
    }

    const record = await createHealthData(userId, req.body);
    return res.status(201).json({ message: 'Health record created successfully', record });
  } catch (error) {
    console.error('Error in addHealthRecord:', error);
    return res.status(500).json({ message: error.message || 'Error creating health record' });
  }
};

export const modifyHealthRecord = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const record = await updateHealthData(userId, req.params.id, req.body);

    if (!record) {
      return sendNotFound(res, 'Health record not found');
    }

    return res.status(200).json({ message: 'Health record updated successfully', record });
  } catch (error) {
    console.error('Error in modifyHealthRecord:', error);
    return res.status(500).json({ message: error.message || 'Error updating health record' });
  }
};

export const removeHealthRecord = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const deleted = await deleteHealthData(userId, req.params.id);

    if (!deleted) {
      return sendNotFound(res, 'Health record not found');
    }

    return res.status(200).json({ message: 'Health record deleted successfully' });
  } catch (error) {
    console.error('Error in removeHealthRecord:', error);
    return res.status(500).json({ message: 'Error deleting health record' });
  }
};

export const addTransformationJournal = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.title || !req.body?.reportType) {
      return res.status(400).json({ message: 'title and reportType are required' });
    }

    const payload = await buildTransformationPayload(userId, req.body);

    const journal = await createTransformationJournal(userId, {
      ...req.body,
      dataWindow: payload.dataWindow,
      recordCounts: payload.recordCounts,
    });

    return res.status(201).json({ message: 'Journal created successfully', journal, payload });
  } catch (error) {
    console.error('Error in addTransformationJournal:', error);
    return res.status(500).json({ message: error.message || 'Error creating journal' });
  }
};

export const addTransformationJournalRequest = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.reportType) {
      return res.status(400).json({ message: 'reportType is required' });
    }

    const payload = await buildTransformationPayload(userId, req.body);
    const journal = await createTransformationJournal(userId, {
      title: `${String(req.body.reportType).toUpperCase()} REPORT REQUEST`,
      reportType: req.body.reportType,
      includeMetrics: Boolean(req.body.includeMetrics),
      includeNutrition: Boolean(req.body.includeNutrition),
      includeWorkouts: Boolean(req.body.includeWorkouts),
      dataWindow: payload.dataWindow,
      recordCounts: payload.recordCounts,
    });

    return res.status(201).json({ message: 'Journal request saved', journal, payload });
  } catch (error) {
    console.error('Error in addTransformationJournalRequest:', error);
    return res.status(500).json({ message: error.message || 'Error creating journal request' });
  }
};

export const getTransformationJournals = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const result = await listTransformationJournalsWithReports(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getTransformationJournals:', error);
    return res.status(500).json({ message: 'Error fetching journal history' });
  }
};

export const generateTransformationReportPreview = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.reportType) {
      return res.status(400).json({ message: 'reportType is required' });
    }

    const payload = await buildTransformationPayload(userId, req.body);
    const reportText = buildTransformationDraftText({ payload });

    return res.status(200).json({
      message: 'Report preview generated',
      payload,
      reportText,
    });
  } catch (error) {
    console.error('Error in generateTransformationReportPreview:', error);
    return res.status(500).json({ message: error.message || 'Error generating report preview' });
  }
};

export const saveTransformationReport = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const { journalId, reportType, reportText, payloadMeta } = req.body ?? {};

    if (!journalId || !reportType || !reportText) {
      return res.status(400).json({ message: 'journalId, reportType, and reportText are required' });
    }

    const journal = await getTransformationJournalById(userId, journalId);
    if (!journal) {
      return sendNotFound(res, 'Journal request not found');
    }

    const report = await createTransformationReport(userId, {
      journalId,
      reportType,
      content: reportText,
      payloadMeta,
    });

    return res.status(201).json({ message: 'Transformation report saved', report });
  } catch (error) {
    console.error('Error in saveTransformationReport:', error);
    return res.status(500).json({ message: error.message || 'Error saving transformation report' });
  }
};

export const getTransformationReport = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    const report = await getTransformationReportById(userId, req.params.id);
    if (!report) {
      return sendNotFound(res, 'Transformation report not found');
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error('Error in getTransformationReport:', error);
    return res.status(500).json({ message: error.message || 'Error fetching transformation report' });
  }
};

export const generateTransformationPayload = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return sendUnauthorized(res);
    }

    if (!req.body?.reportType) {
      return res.status(400).json({ message: 'reportType is required' });
    }

    const payload = await buildTransformationPayload(userId, req.body);
    return res.status(200).json({ message: 'Payload generated successfully', payload });
  } catch (error) {
    console.error('Error in generateTransformationPayload:', error);
    return res.status(500).json({ message: error.message || 'Error generating payload' });
  }
};
