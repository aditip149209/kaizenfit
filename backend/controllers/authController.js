import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../models/index.js'
import { GetUserByEmail,insertIntoUser } from '../models/services/userQuery.js'

const registerUser = async (req, res) => {
  const {firstname, lastname, username, email, password, dob} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if(!username || !email || !password || !firstname || !lastname || !dob){
    return res.status(400).json({
      message: "Please fill in all fields"
    })
  }

  //check is password is of length atleast 8, has atleast one upper case, one symbol and one number 
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+])[A-Za-z\d@$!%*?&#^()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  if(!isValidPassword(password)){
    return res.status(401).json({
      message: "Password should have atleast 8 characters with atleast 1 uppercase, 1 digit and 1 symbol"
    })
  }

  try{
    const userExists = await GetUserByEmail(email);
    console.log(userExists);
    if(userExists){
      return res.status(400).json({
        message: "User already exists"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      FirstName: firstname,
      LastName: lastname,
      Username: username,
      Email: email, 
      Password: hashedPassword,
      DateOfBirth : dob
    }
    const userCreate = insertIntoUser(data);
    return res.status(201).json({
      message: "User registered successfully"
    })

  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      message: "There was an error registering"
    })
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({
      message: "Enter all fields"
    })
  }
  try{
    const user = await GetUserByEmail(email);
    if(!user){
      console.log("User does not exist");
      return res.status(400).json({
        message: "User does not exist"
      })
    }
    const hashedDBPassword = user.dataValues.Password;
    console.log(hashedDBPassword);

    const isPasswordCorrect = await bcrypt.compare(password, hashedDBPassword);

    if(!isPasswordCorrect){
      console.log("Password incorrect");
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign({id: user.dataValues.UserID}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({
      message:"Login successful",
      token,
      user
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message: "Server error"})    
  }
}

//will work on the refresh token here

export {loginUser, registerUser};





