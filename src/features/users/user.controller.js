import UserRepository from "./user.respository.js"
import { ApplicationError } from "../../middleware/application.Error.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
export class UserController{
    constructor(){
this.userRepository= new UserRepository
    }
    async signup(req,res,next){
try{
const {name,email,password}=req.body
const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
if (!passwordRegex.test(password)) {
    return res.status(400).send("Password should be 8–12 characters long and include at least one special character")
}
const hashedPassword = await bcrypt.hash(password,12)
const newUserData={name,email,password:hashedPassword}
const newUser = await this.userRepository.signup(newUserData)
return res.status(200).send(newUser)
}
catch(err){
console.log(err)
throw new ApplicationError("Failed to add new user")
}
    }
async signin(req,res,next){
try{
const {email,password}=req.body
const user = await this.userRepository.signin(email)
console.log(user)
if(!user) return res.status(400).send("User not found")
const result = await bcrypt.compare(password,user.password);
if(result){
    const token = jwt.sign({
        userId: user._id,          // use lowercase and Mongo _id
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.tokens.push(token);
    await user.save();
    return res.status(200).json(token);
}
else{
    return res.status(404).send("Incorrect credentials")
}
}
catch(err){
    console.log(err);
    throw new ApplicationError("Invalid credentials")
}
    }
    async logout(req,res,next){
try{
const {userId,token}=req.body
const loggedout=await this.userRepository.logout(userId,token)
if(!loggedout){
        return res.status(400).send("Log out failed")
}
return res.send("Logged out from current device")
}
catch(err){
    console.log(err)
    throw new ApplicationError("Logout failed")
}
    }
    async logoutfromAllDevices(req,res,next){
try{
    const {userId}=req.body
    const loggedOutFromAllDevices=await this.userRepository.logoutAllDevices(userId)
if(!loggedOutFromAllDevices){
return res.status(404).send("Log out from alll device failed")
}
else{
    return res.status(200).send("Logged out from all devices")
}
}
catch(err){
    console.log(err)
    throw new ApplicationError("Logout from all device failed")
}
    }
    
}