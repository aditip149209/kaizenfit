import db from "../index.js";
import { sequelize } from "../../utils/database.js";
import { Op } from "sequelize";

export const createNewDiet = async (dietData, foodItems) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
        // Step 1: Create the diet plan
        const newDiet = await db.DietPlan.create(dietData, { transaction });
        console.log("New Diet Plan Created:", newDiet);
            
        // Step 2: Add entries to the join table (DietPlanFoodItem)
        const dietFoodItem = foodItems.map(foodItem => ({
            DietPlanID: newDiet.DietPlanID, 
            FoodID: foodItem.id, 
            customQuantity: foodItem.quantity || null
        }));

        //intermediate step: calculate total calories and total carbs and total protein and total fats
        let totalCalories = 0;
        let totalCarbs = 0; 
        let totalProtein = 0;
        let totalFats = 0;

        for (const foodItem of dietFoodItem) {

            const foodDetails = await db.FoodItem.findOne({
                where: { FoodID: foodItem.FoodID },
                attributes: ['Calories', 'Carbohydrates', 'Protein', 'Fats']
            });

            //convert the quantity to quanitty per gram
            //like one serving is x grams 
            //so if the user eats 2 servings, multiply the calories by 2
            //if the user eats 1 serving, multiply the calories by 1
            //if the user eats 0.5 servings, multiply the calories by 0.5  

            if (foodDetails) {
                const servingDetails = await db.FoodServingReference.findOne({
                    where: { FoodID: foodItem.FoodID },
                    attributes: ['AvgWeightPerServing']
                });

                if (!servingDetails) {
                    console.error(`No serving details found for FoodID: ${foodItem.FoodID}`);
                    // continue; // Skip this food item if no serving details are found
                }

                const newCustomWeight = (foodItem.customQuantity * servingDetails.AvgWeightPerServing)/100;
                totalCalories += foodDetails.Calories * (newCustomWeight || 1);
                totalCarbs += foodDetails.Carbohydrates * (newCustomWeight || 1);
                totalProtein += foodDetails.Protein * (newCustomWeight || 1);
                totalFats += foodDetails.Fats * (newCustomWeight || 1);
            }
        }
        // Update the diet plan with the calculated totals
        await db.DietPlan.update(
            {
                CaloriesConsumed: totalCalories,
                CarbsConsumed: totalCarbs,
                ProteinConsumed: totalProtein,
                FatsConsumed: totalFats
            },
            {
                where: { DietPlanID: newDiet.DietPlanID },
                transaction
            }
        );

        console.log("diet plan updated with correct totals");

        // Step 3: Bulk create the food items in the join table
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

export const getDietListFromDB = async(UserID) => {
    try{
    const diets = await db.DietPlan.findAll({
        where: { [Op.or]: [
            { createdByUserId: null }, // Default workouts
            { createdByUserId: UserID }, // User-specific workouts
        ] },
        attributes: ['Name',  'Type', 'createdByUserId', 'DietPlanID', 'CaloriesConsumed', 'CarbsConsumed', 'ProteinConsumed', 'FatsConsumed'],
        include: [
            {
                model: db.FoodItem,
                attributes: ['Name', 'FoodID', 'Timing', 'Quantity'],
                through: { attributes: ['FoodID', 'customQuantity'] } // This removes the extra fields from the join table in the result
            }
        ]
      });
      console.log(diets); 
      return diets
    }
    catch(error){
        console.log(error);
    }
}

export const createNewFoodItem = async (data, AvgWeightPerServingData) => {
    try{
    const newFood = await db.FoodItem.create(data);
    let newFoodData = {
        FoodID: newFood.FoodID,
        AvgWeightPerServing: AvgWeightPerServingData.AvgWeightPerServing
    }
    console.log(newFoodData);
    await db.FoodServingReference.create(newFoodData)

    console.log("New Food Item Created:", newFood);    

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