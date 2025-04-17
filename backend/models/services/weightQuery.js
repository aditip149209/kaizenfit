import db from "../index.js";
import { Op } from "sequelize";

export const logWeight = async (userId, weight) => {
    try {
        const weightLog = await db.WeightLog.create({
            UserID: userId,
            Weight: weight,
            Timestamp: new Date(), // Current timestamp
        });

        return weightLog; // Return the created weight log entry
    } catch (error) {
        console.error("Error logging weight:", error);
        throw error;
    }
};

export const getLoggedWeights = async (userId) => {
    try {
        const weights = await db.WeightLog.findAll({
            where: { UserID: userId },
            attributes: ['Weight', 'Timestamp'], // Retrieve only weight and timestamp
            order: [['Timestamp', 'ASC']], // Sort by timestamp in ascending order
        });

        // Map the results to an array of objects
        return weights.map(weightLog => ({
            weight: weightLog.Weight,
            timestamp: weightLog.Timestamp,
        }));
    } catch (error) {
        console.error("Error retrieving logged weights:", error);
        throw error;
    }
};