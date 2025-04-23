import db from "../models/index.js";
import { Op, where } from "sequelize";

import { getOrCreateTodayLog, trackFood } from "../models/services/trackQuery.js";


//just log food from the add food modal using this controller
export const logFoodController = async (req, res) => {
    const {userId, foodId, quantity} = req.body;
    if(!userId || !foodId || !quantity){
        return res.status(400).json({
            message: "Need all fields"
        })
    }
    try{
        const entryId = await getOrCreateTodayLog(userId);

        if(entryId){
            const loggedFood = await trackFood(entryId, foodId, quantity)
            
        }
        return res.status(200).json({message: "Logged food successfully",
  
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error"
        })
    }    
};

//retrieve the log for today using this controller. use returned data to calculated calories, macros breakdown by timing
//we will need userid and date. date we can obtain using now, only user id will need to be sent. 
//use the user id and date to find the entry id in the log table, using the entry id, find all entries in the logtodayfooditem table 

export const getFoodLogController = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
  
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
  
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
      const todayLog = await db.LogToday.findOne({
        where: {
          UserID: userId,
          Timestamp: {
            [Op.between]: [todayStart, todayEnd],
          },
        },
        include: [
          {
            model: db.FoodItem,
 
            attributes: [
              "FoodID",
              "Name",
              "Calories",
              "Protein",
              "Carbohydrates",
              "Fats",
              "Timing",
              "Measure",
              "Quantity",
              "Type",
            ],
            through: {
              attributes: ["CustomQuantity", "Timestamp"], // fields from join table
            },
            include:[{
            
              model: db.FoodServingReference,
              attributes: ['AvgWeightPerServing']

          }]
            
          },          
        ],
      });
  
      if (!todayLog) {
        return res.status(200).json({
          message: "No log found for today.",
          data: [],
        });
      }
  
      return res.status(200).json({
        message: "Fetched food log for today.",
        todayLog
      });
    } catch (error) {
      console.error("Error getting food log:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
  


//use this to delete food items from tracked food items list.
export const deleteLogController = async (req, res) => {
    const { entryId, foodId, timestamp } = req.body;
  
    // Validate inputs
    if (!entryId || !foodId || !timestamp) {
      return res.status(400).json({
        message: "EntryID, FoodID, and Timestamp are required.",
      });
    }
  
    try {
      // Convert timestamp to Date object (optional but helps avoid mismatch)
      const parsedTimestamp = new Date(timestamp).toISOString;
  
      const rowsDeleted = await db.LogTodayFoodItem.destroy({
        where: {
          EntryID: entryId,
          FoodID: foodId,
          Timestamp: parsedTimestamp, // ensure format matches DB
        },
      });
  
      if (rowsDeleted === 0) {
        return res.status(404).json({
          message: "No matching food log found to delete. Check timestamp accuracy.",
        });
      }
  
      return res.status(200).json({
        message: "Food item deleted from log successfully.",
      });
    } catch (error) {
      console.error("Error deleting food log:", error);
      return res.status(500).json({
        message: "Error deleting food log",
        error: error.message,
      });
    }
  };
  



