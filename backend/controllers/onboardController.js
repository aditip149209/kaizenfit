import db from "../models/index.js";
import { onboardUserDetails } from "../models/services/userQuery.js";
import { jwtDecode } from "jwt-decode"
import jwt from 'jsonwebtoken'


const onboardUser = async (req, res) => {
  const {gender, height, weight, goal, fitnessLevel, goalWeight} = req.body;
  if(!height || !weight || !gender || !goal || !fitnessLevel){
    return res.status(400).json({
      message: "Some fields are missing please recheck"
    })
  }
  const data = {
    Height: height,
    FitnessGoal: goal,
    FitnessLevel: fitnessLevel,
    Gender: gender,
    WeightGoal: weight,
    GoalWeight: goalWeight
  }
 
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part
  let decoded;

  try {
    // Decode the token using the secret key
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const UserID = decoded.id; 
  
  try{
    const tryUpdate = await onboardUserDetails(UserID, data);
    return res.status(200).json({
      message: "Onboarding complete"
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Server error"
    })  
  }
}
const isOnboarded = async (req, res) => {
    try{
        const UserID = req.body;
        const getStat = await db.Users.findOne({
            where: {UserID}, 
            attributes: ['isOnboarded']
        })
        return res.status(200).json(getStat);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}


export {onboardUser, isOnboarded};
