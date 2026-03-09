import { getUserById, createUser } from "../models/services.js";


export const syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user;

    //check if data exists in ur db
    let user = await getUserById(uid);

    if(!user) {
      console.log("Creating new user in db");
      user = await createUser(uid, email);
    }

    res.status(200).json({
      message: "User synced successfully",
      user: user
    })
  }
  catch(error) {
    res.status(500).json({
      error: error.message
    })
  }
}