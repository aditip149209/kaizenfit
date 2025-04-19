import db from "../index.js";
import { sequelize } from "../../utils/database.js";


export const createNewDiet = async (dietData, foodItems) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
        // Step 1: Create the workout
        const newDiet = await db.DietPlan.create(dietData, { transaction });
            

        // Step 2: Add entries to the join table (DietPlanFoodItem)
        const dietFoodItem = foodItems.map(foodItem => ({
            WorkoutID: newDiet.DietPlanID, 
            FoodID: foodItem.id, 
            customQuantity: foodItem.quantity || null
        }));

        await db.DietPlanFoodItem.bulkCreate(dietFoodItem, { transaction });

        // Commit the transaction
        await transaction.commit();

        return {
            diet: newDiet,
            foodItems: dietFoodItem,
        };
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error("Error creating diet with food:", error);
        throw error;
    }
};


export const createNewFoodItem = async (data) => {
    try{
    const newFood = await db.FoodItem.create(data);
    return newFood
    }
    catch(error){
        throw error
    }
}

export const getFoodListFromDB = async () => {
    let foodItems
    try{
        foodItems = await db.FoodItem.findAll(
            {attributes: ['Name', 'FoodID', 'Measure', 'Quantity']}
        )
        return foodItems
    }
    catch(error){
        throw error
    }
}