import dotenv from 'dotenv';
dotenv.config()
import express from "express";

import { connnectUsingMongoose } from "./src/config/mongoose.config.js";
import { ApplicationError } from './src/middleware/application.Error.js';
import mongoose from 'mongoose';
import { userRouter } from './src/features/users/user.router.js';
import { todoRouter } from './src/features/todo/todo.router.js';
const app = express()
app.use(express.json())
app.use("/api/users",userRouter)
app.use("/api/todos",todoRouter)
app.use((err,req,res,next)=>{
    if(err instanceof  ApplicationError){
        return res.status(err.code).send(err.message)
    }
    if(err instanceof mongoose.Error.ValidationError){
return res.status(400).send(err.message)
    }
})
app.listen(3000,()=>{console.log("Server is listening")
    connnectUsingMongoose()
})