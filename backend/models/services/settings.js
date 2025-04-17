import db from "../index.js";


export const getUserProfile = async (userId) => {
    try {
        const user = await db.Users.findOne({
            where: { UserID: userId },
            attributes: ['Name', 'Age', 'Gender', 'Height', 'FitnessGoal'], // Add other fields as needed
        });

        if (!user) {
            throw new Error("User not found.");
        }

        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};


export const updateUserProfile = async (userId, updatedData) => {
    try {
        const [updatedRows] = await db.Users.update(updatedData, {
            where: { UserID: userId },
        });

        if (updatedRows === 0) {
            throw new Error("User not found or no changes made.");
        }

        return { message: "User profile updated successfully." };
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};