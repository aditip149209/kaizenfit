import { updateUserGoalsController } from "../../controllers/settingsController.js";
import db from "../index.js";
import { Op, where } from "sequelize";

const GetUserByEmail = async (email) => {
    try{
    const userIfExists = await db.Users.findOne({
        where: {
            Email: email
        }
    });
    return userIfExists;
    }
    catch(error){
        console.error("Error fetching user by email:", error);
    }
};

const getUserBYID = async (UserID) => {
    try{
        const userIfExists = await db.Users.findOne({
            where: {
                UserID: UserID
            }
        })
        return userIfExists;
    }
    catch(error){
        console.error("Error fetching user by ID", error);
    }
}

const insertIntoUser = async (data) => {
    try{
        const user = await db.Users.create(data);
        console.log("User created");
        return user
    }
    catch(error){
        console.error(error);
    }
}

const onboardUserDetails = async (UserID, data) => {
    console.log(data);
    try{
        const updateUser = await db.Users.update({
            ...data, isOnboarded: true
        }, {
            where: {UserID: UserID}
        })  
        console.log(updateUser);
        return updateUser;
    }
    catch(error){
        console.log(error);
    }
}



const setOnboard = async(req, res) => {
    try{
        const {UserID, isOnboarded} = req.body;
        await db.Users.update({
            isOnboarded
        })
    }
    catch(error){
        console.log(error);
    }
}

//this will fetch all attributes of the user table
const getDashboardData = async (UserID) => {
    try{
        const profileData = db.Users.findOne({
            where: {UserID}
        })
        return profileData           
    }
    catch(error){
        console.log(error)


    }
}


const todayFoodLog = async (userId, date) => {
    try {
        // Step 1: Retrieve all EntryIDs for the user on the specified day
        const logEntries = await db.LogToday.findAll({
            where: {
                UserID: userId,
                Timestamp: {
                    [db.Sequelize.Op.gte]: new Date(date).setHours(0, 0, 0, 0),
                    [db.Sequelize.Op.lt]: new Date(date).setHours(23, 59, 59, 999),
                },
            },
            attributes: ['EntryID'], // Only retrieve EntryIDs
        });

        const entryIds = logEntries.map(entry => entry.EntryID);

        if (entryIds.length === 0) {
            return { message: "No food log entries found for the specified user and date." };
        }

        // Step 2: Retrieve the list of FoodIDs and quantities associated with those EntryIDs
        const foodItems = await db.LogTodayFoodItem.findAll({
            where: {
                EntryID: entryIds,
            },
            attributes: ['FoodID', 'CustomQuantity', 'Measure'], // Include quantity and measure
        });

        const foodIds = foodItems.map(item => item.FoodID);

        if (foodIds.length === 0) {
            return { message: "No food items found for the specified entries." };
        }

        // Step 3: Fetch nutritional details for those FoodIDs
        const foodDetails = await db.FoodItem.findAll({
            where: {
                FoodID: foodIds,
            },
            attributes: ['FoodID', 'Calories', 'Protein', 'Carbohydrates', 'Fats', 'Measure'], // Include default measure
        });

        // Step 4: Calculate totals based on quantity and measure
        const totals = foodItems.reduce(
            (acc, foodItem) => {
                const foodDetail = foodDetails.find(food => food.FoodID === foodItem.FoodID);

                if (foodDetail) {
                    // Adjust nutritional values based on quantity
                    const quantityMultiplier = foodItem.CustomQuantity || 1;

                    acc.totalCalories += foodDetail.Calories * quantityMultiplier;
                    acc.totalProtein += foodDetail.Protein * quantityMultiplier;
                    acc.totalCarbohydrates += foodDetail.Carbohydrates * quantityMultiplier;
                    acc.totalFats += foodDetail.Fats * quantityMultiplier;
                }

                return acc;
            },
            { totalCalories: 0, totalProtein: 0, totalCarbohydrates: 0, totalFats: 0 }
        );

        return totals;
    } catch (error) {
        console.error("Error fetching food log summary:", error);
        throw error;
    }
};

const getFoodLogByType = async (userId, date, type) => {
    try {
        // Step 1: Retrieve all EntryIDs for the user on the specified day
        const logEntries = await db.LogToday.findAll({
            where: {
                UserID: userId,
                Timestamp: {
                    [db.Sequelize.Op.gte]: new Date(date).setHours(0, 0, 0, 0),
                    [db.Sequelize.Op.lt]: new Date(date).setHours(23, 59, 59, 999),
                },
            },
            attributes: ['EntryID'], // Only retrieve EntryIDs
        });

        const entryIds = logEntries.map(entry => entry.EntryID);

        if (entryIds.length === 0) {
            return { message: `No ${type} food log entries found for the specified user and date.` };
        }

        // Step 2: Retrieve the list of FoodIDs and quantities associated with those EntryIDs
        const foodItems = await db.LogTodayFoodItem.findAll({
            where: {
                EntryID: entryIds,
            },
            attributes: ['FoodID', 'CustomQuantity'], // Include quantity
        });

        const foodIds = foodItems.map(item => item.FoodID);

        if (foodIds.length === 0) {
            return { message: `No ${type} food items found for the specified entries.` };
        }

        // Step 3: Fetch nutritional details for those FoodIDs and filter by type
        const foodDetails = await db.FoodItem.findAll({
            where: {
                FoodID: foodIds,
                Timing: type, // Filter by the specified type (breakfast, lunch, snack, dinner)
            },
            attributes: ['FoodID', 'Calories', 'Protein', 'Carbohydrates', 'Fats'], // Include default measure
        });

        // Step 4: Calculate totals based on quantity
        const totals = foodDetails.reduce(
            (acc, foodDetail) => {
                const foodItem = foodItems.find(item => item.FoodID === foodDetail.FoodID);

                if (foodItem) {
                    // Adjust nutritional values based on quantity
                    const quantityMultiplier = foodItem.CustomQuantity || 1;

                    acc.totalCalories += foodDetail.Calories * quantityMultiplier;
                    acc.totalProtein += foodDetail.Protein * quantityMultiplier;
                    acc.totalCarbohydrates += foodDetail.Carbohydrates * quantityMultiplier;
                    acc.totalFats += foodDetail.Fats * quantityMultiplier;
                }

                return acc;
            },
            { totalCalories: 0, totalProtein: 0, totalCarbohydrates: 0, totalFats: 0 }
        );

        return totals;
    } catch (error) {
        console.error(`Error fetching ${type} food log summary:`, error);
        throw error;
    }
};

const logFoodByType = async (userId, date, foodId, customQuantity, type) => {
    try {
        const foodItem = await db.FoodItem.findOne({
            where: {
                FoodID: foodId,
                Timing: type,
            },
        });

        if (!foodItem) {
            throw new Error(`Food item with ID ${foodId} does not exist or is not of type ${type}.`);
        }

        // Create a new log entry in LogToday
        const logToday = await db.LogToday.create({
            UserID: userId,
            Timestamp: new Date(date),
        });        

        const logTodayFoodItem = await db.LogTodayFoodItem.create({
            EntryID: logToday.EntryID,
            FoodID: foodId,
            CustomQuantity: customQuantity || 1,
        });

        return logTodayFoodItem;
    } catch (error) {
        console.error("Error logging food by type:", error);
        throw error;
    }
};

const deleteLog = async (EntryId) => {
    try {
        // Delete the log entry and cascade to related tables
        await db.LogToday.destroy({
            where: { EntryID },
            cascade: true, // Ensure cascading deletion
        });

        return { message: `Log with EntryID ${entryId} deleted successfully.` };
    } catch (error) {
        console.error("Error deleting log:", error);
        throw error;
    }
};


const getTodaysWaterIntake = async (userId) => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    try {
        const latestEntry = await db.WaterLog.findOne({
            where: {
                UserID: userId,
                Timestamp: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay,
                },
            },
            order: [['Timestamp', 'DESC']],
        });

        return latestEntry ? latestEntry : 0;
    } catch (error) {
        console.error("Error fetching today's latest water log:", error);
        throw error;
    }
};

export const getGoalIntake = async (userId) => {
    try {
      const goal = await db.Users.findOne({
        attributes: ['WaterIntakeGoalGlasses', 'WaterIntakeGoalVolume'],
        where: { UserID: userId },
      });
      return goal; // ← don't forget to return it!
    } catch (error) {
      console.log(error);
    }
  };
  

const logWaterIntake = async (userId, quantity, volume) => {
    try {
        // Create a new entry in the WaterLog table
        const waterLog = await db.WaterLog.create({
            UserID: userId,
            Timestamp: new Date(), // Current timestamp
            Quantity: quantity, 
            Volume: volume// Amount of water consumed
        });

        return waterLog; // Return the created log entry
    } catch (error) {
        console.error("Error logging water intake:", error);
        throw error;
    }
};


export {GetUserByEmail, insertIntoUser, onboardUserDetails, getUserBYID, todayFoodLog, 
    logWaterIntake, getTodaysWaterIntake, getFoodLogByType, logFoodByType, deleteLog};


