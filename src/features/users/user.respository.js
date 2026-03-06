import { userAuthModel } from "./user.model.js";

export default class UserRepository{
    async signup(newUserData){
        const newUser = new userAuthModel(newUserData);
        await newUser.save()
        return newUser;
    }
    async signin(email){
    return await userAuthModel.findOne({email})
    }
    async logout(userId,token){
const user = await userAuthModel.findById(userId);
console.log(user)
if(!user) return res.status(400).send("Invalid User")
user.tokens=user.tokens.filter(t=>t!==token)
await user.save()
return user
    }
    async logoutAllDevices(userId){
const user = await userAuthModel.findById(userId);  
user.tokens=[]
return await user.save()
    }
    async findById(userId){
        return await userAuthModel.findById(userId)
    }
}