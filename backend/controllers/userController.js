import { Op } from "sequelize";

import db from "../models/index.js";
import { todayFoodLog, logWaterIntake, getTodaysWaterIntake, getGoalIntake } from "../models/services/userQuery.js";

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
    const { userId, quantity, volume } = req.body;

    if (!userId || !quantity || !volume) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const waterLog = await logWaterIntake(userId, quantity, volume);

        return res.status(201).json({
            message: "Water intake logged successfully.",
            waterLog,
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
      const {WaterIntakeGoalGlasses, WaterIntakeGoalVolume} = await getGoalIntake(userId);

      return res.status(200).json({
          message: "Today's water intake retrieved successfully.",
          data: {
              userId,
              totalWaterIntake,
              WaterIntakeGoalGlasses,
              WaterIntakeGoalVolume
          },
      });
  } catch (error) {
      console.error("Error fetching today's water intake:", error);
      return res.status(500).json({ message: "Error fetching today's water intake.", error });
  }
};

const editWaterIntakeGoalController = async (req, res) => {
  const { userId, goalIntakeGlasses, goalIntakeVolume } = req.body;

  if (!userId || !goalIntakeGlasses || !goalIntakeVolume) {
      return res.status(400).json({ message: "User ID and goal intake are required." });
  }

  try {
      const updatedUser = await db.Users.update(
          { WaterIntakeGoalGlasses: goalIntakeGlasses, WaterIntakeGoalVolume: goalIntakeVolume },
          { where: { UserID: userId } }
      );

      if (updatedUser[0] === 0) {
          return res.status(404).json({ message: "User not found or goal not updated." });
      }

      return res.status(200).json({
          message: "Water intake goal updated successfully.",
          data: { userId, goalIntakeGlasses, goalIntakeVolume },
      });
  } catch (error) {
      console.error("Error updating water intake goal:", error);
      return res.status(500).json({ message: "Error updating water intake goal.", error });
  }
};

export const getWaterGoalController = async (req, res) => {
    const {userId} = req.body
    let goalWaterData
    try{
        goalWaterData = await getGoalIntake(userId);
        return res.status(200).json(goalWaterData)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
};

export const getUserDetailsController = async (req, res) => {
    const userId = req.query.UserID
    let userData
    try{
        userData = await db.Users.findOne({
            where: {UserID: userId}
        })
        return res.status(200).json(userData)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}




export { getFoodDetails, logWaterIntakeController, getTodaysWaterIntakeController, editWaterIntakeGoalController };

