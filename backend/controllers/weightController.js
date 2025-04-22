import db from "../models/index.js";

import { logWeight, getLoggedWeights } from "../models/services/weightQuery.js";

export const logWeightController = async (req, res) => {
    const { userId, weight, date } = req.body;

    if (!userId || !weight) {
        return res.status(400).json({ message: "User ID and weight are required." });
    }

    try {
        const weightLog = await logWeight(userId, weight, date);

        return res.status(201).json({
            message: "Weight logged successfully.",
            data: weightLog,
        });
    } catch (error) {
        console.error("Error logging weight:", error);
        return res.status(500).json({ message: "Error logging weight.", error });
    }
};

export const getLoggedWeightsController = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const weights = await getLoggedWeights(userId);

        if (!weights || weights.length === 0) {
            return res.status(404).json({ message: "No weights logged for this user." });
        }

        return res.status(200).json({
            message: "Logged weights retrieved successfully.",
            data: weights,
        });
    } catch (error) {
        console.error("Error retrieving logged weights:", error);
        return res.status(500).json({ message: "Error retrieving logged weights.", error });
    }
};


