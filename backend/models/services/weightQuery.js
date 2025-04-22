import db from "../index.js";
import { Op } from "sequelize";

export const logWeight = async (userId, weight, date) => {
    try {
        const weightLog = await db.WeightLog.create({
            UserID: userId,
            Weight: weight,
            Date: date,

        });

        await db.Users.update(
            { WeightGoal: weight }, // Update the user's weight
            { where: { UserID: userId } } // Specify the user to update
        );

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