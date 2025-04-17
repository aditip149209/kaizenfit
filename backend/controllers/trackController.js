import db from "../models/index.js";

import { getFoodLogByType, logFoodByType, deleteLog } from "../models/services/userQuery.js";

export const logFoodByTypeController = async (req, res) => {
    const { userId, date, foodId, customQuantity, type } = req.body;

    if (!userId || !date || !foodId || !type) {
        return res.status(400).json({ message: "User ID, date, food ID, and type are required." });
    }

    try {
        const log = await logFoodByType(userId, date, foodId, customQuantity, type);

        return res.status(201).json({
            message: `Food item logged successfully for ${type}.`,
            data: log,
        });
    } catch (error) {
        console.error("Error logging food by type:", error);
        return res.status(500).json({ message: "Error logging food by type.", error });
    }
};

export const getFoodLogByTypeController = async (req, res) => {
    const { userId, date, type } = req.body;

    if (!userId || !date || !type) {
        return res.status(400).json({ message: "User ID, date, and type are required." });
    }

    try {
        const foodLog = await getFoodLogByType(userId, date, type);

        if (!foodLog || foodLog.message) {
            return res.status(404).json({ message: foodLog.message || `No food log found for ${type}.` });
        }

        return res.status(200).json({
            message: `Food log for ${type} retrieved successfully.`,
            data: foodLog,
        });
    } catch (error) {
        console.error(`Error fetching food log for ${type}:`, error);
        return res.status(500).json({ message: `Error fetching food log for ${type}.`, error });
    }
};


export const deleteLogController = async (req, res) => {
    const { entryId } = req.body;

    if (!entryId) {
        return res.status(400).json({ message: "Entry ID is required." });
    }

    try {
        const result = await deleteLog(entryId);

        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        console.error("Error deleting log:", error);
        return res.status(500).json({ message: "Error deleting log.", error });
    }
};




