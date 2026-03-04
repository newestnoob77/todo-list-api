import mongoose from 'mongoose';
const userAuthSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/,"Please enter a valid email"],
    },
    password:{type:String,required:true},
    tokens:{type:[String],default:[]}
})
export const userAuthModel = mongoose.model("User",userAuthSchema)