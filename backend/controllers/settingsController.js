import { getUserProfile, updateUserProfile } from "../models/services/settings.js";

export const getUserProfileController = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const user = await getUserProfile(userId);

        return res.status(200).json({
            message: "User profile fetched successfully.",
            data: user,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Error fetching user profile.", error });
    }
};

export const updateUserProfileController = async (req, res) => {
    const { userId } = req.params;
    const updatedData = req.body;

    if (!userId || !updatedData) {
        return res.status(400).json({ message: "User ID and updated data are required." });
    }

    try {
        const result = await updateUserProfile(userId, updatedData);

        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: "Error updating user profile.", error });
    }
};

