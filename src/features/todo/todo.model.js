import mongoose from "mongoose"
const todoSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String,required:true},
    description:{type:String,required:true}
})

export const todoModel = mongoose.model("Todos",todoSchema)