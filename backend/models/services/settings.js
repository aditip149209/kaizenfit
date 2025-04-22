import db from "../index.js";
import bcrypt, { hash } from 'bcryptjs'

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
      const user = await db.Users.findOne({
        where: { UserID: userId }
      });
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      // If password change is requested
      if (updatedData.currentPassword && updatedData.newPassword) {
        const isMatch = await bcrypt.compare(updatedData.currentPassword, user.Password);
  
        if (!isMatch) {
          throw new Error("Current password is incorrect.");
        }
  
        // Hash new password
        const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);
        updatedData.Password = hashedPassword;
  
        // Remove these so they don’t try to update non-existent fields
        delete updatedData.currentPassword;
        delete updatedData.newPassword;
      }
  
      const [updatedRows] = await db.Users.update(updatedData, {
        where: { UserID: userId }
      });
  
      if (updatedRows === 0) {
        throw new Error("No changes were made.");
      }
  
      return { message: "User profile updated successfully." };
    } catch (error) {
      console.error("Error updating user profile:", error.message);
      throw error;
    }
  };

  export const updateUserGoals = async (userId, updatedData) => {
    try {
        const user = await db.Users.findOne({
            where: { UserID: userId }
        });

        if (!user) {
            throw new Error("User not found.");
        }

        const [updatedRows] = await db.Users.update(updatedData, {
            where: { UserID: userId }
        });

        if (updatedRows === 0) {
            throw new Error("No changes were made.");
        }

        return { message: "User goals updated successfully." };
    } catch (error) {
        console.error("Error updating user goals:", error.message);
        throw error;
    }

  }