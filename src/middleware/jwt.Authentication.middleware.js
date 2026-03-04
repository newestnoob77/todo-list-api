import jwt from 'jsonwebtoken';
import { userAuthModel } from '../features/users/user.model.js';
export const jwtAuth=async(req,res,next)=>{
    const token =req.headers["authorization"]
    console.log(token)
    if(!token){
        return res.status(401).send("Unauthorized")
    }
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        const user =await userAuthModel.findOne({_id:payload.UserId,tokens:token})
   if(!user){
    return res.status(401).send("unauthorized");
   }
   req.user=user
   req.token=token
   next()
    }
    catch(err){
        console.log(err)
         return res.status(401).send("Unauthorized")
    }
}