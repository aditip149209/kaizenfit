import { Op } from "sequelize";

import db from "../models/index.js";
import { todayFoodLog, logWaterIntake, getTodaysWaterIntake } from "../models/services/userQuery.js";

//this is for the food dets card on the dashboard
const getFoodDetails = async (req, res) =>  {
  const {UserID, date} = req.body;
  if(!UserID || !date){
    return res.status(400).json({
      message: "Fields are empty"
    })
  }
  try{
    const totals = await todayFoodLog(UserID, date);
    return res.status(200).json(totals)
  }
  catch(error){
    console.log(error)
  }
}

const logWaterIntakeController = async (req, res) => {
    const { userId, quantity } = req.body;

    if (!userId || !quantity) {
        return res.status(400).json({ message: "User ID and quantity are required." });
    }

    try {
        const waterLog = await logWaterIntake(userId, quantity);

        return res.status(201).json({
            message: "Water intake logged successfully.",
            data: waterLog,
        });
    } catch (error) {
        console.error("Error logging water intake:", error);
        return res.status(500).json({ message: "Error logging water intake.", error });
    }
};

const getTodaysWaterIntakeController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
  }

  try {
      const totalWaterIntake = await getTodaysWaterIntake(userId);

      return res.status(200).json({
          message: "Today's water intake retrieved successfully.",
          data: {
              userId,
              totalWaterIntake,
          },
      });
  } catch (error) {
      console.error("Error fetching today's water intake:", error);
      return res.status(500).json({ message: "Error fetching today's water intake.", error });
  }
};

const editWaterIntakeGoalController = async (req, res) => {
  const { userId, goalIntake } = req.body;

  if (!userId || !goalIntake) {
      return res.status(400).json({ message: "User ID and goal intake are required." });
  }

  try {
      const updatedUser = await db.Users.update(
          { WaterIntakeGoal: goalIntake },
          { where: { UserID: userId } }
      );

      if (updatedUser[0] === 0) {
          return res.status(404).json({ message: "User not found or goal not updated." });
      }

      return res.status(200).json({
          message: "Water intake goal updated successfully.",
          data: { userId, goalIntake },
      });
  } catch (error) {
      console.error("Error updating water intake goal:", error);
      return res.status(500).json({ message: "Error updating water intake goal.", error });
  }
};

export { getFoodDetails, logWaterIntakeController, getTodaysWaterIntakeController, editWaterIntakeGoalController };

