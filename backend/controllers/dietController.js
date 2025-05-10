import { createNewDiet, createNewFoodItem, getFoodListFromDB } from "../models/services/dietQuery.js";

export const createNewDietController = async (req, res) => {
    const {dietData, foodItems} = req.body;

    if (!dietData || !foodItems || foodItems.length === 0) {
        return res.status(400).json({ message: "Diet data and food items are required." });
    }
    try {
        const result = await createNewDiet(dietData, foodItems);

        return res.status(201).json({
            message: "Diet Plan created successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error creating diet plan with exercises:", error);
        return res.status(500).json({ message: "Error creating diet plan with exercises.", error });
    }
};


export const createFoodItemController = async (req, res) => {
    const {Name, Description, Calories, Quantity, Measure, Protein, Carbohydrates, Fats, Timing, Type} = req.body;

    console.log(req.body);
    const data = {
        Name: Name, 
        Description: Description,
        Calories: Calories, 
        Quantity: Quantity, 
        Measure: Measure, 
        Protein: Protein,
        Fats: Fats, 
        Carbohydrates: Carbohydrates,
        Type: Type,
        Timing: Timing
    }
    try{
        const createFood = await createNewFoodItem(data);
        return res.status(201).json({
            message: "Food Item created",
            createFood
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const getFoodItemListController = async (req, res) => {
     let foodItems
        try{
            foodItems = await getFoodListFromDB();
            return res.status(200).json(foodItems);
        }
        catch(error){
            console.log(error)
            return res.status(500).json({message: "Server error"})
        }
}




