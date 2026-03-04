import express from 'express';
import { UserController } from './user.controller.js';
import { jwtAuth } from '../../middleware/jwt.Authentication.middleware.js';
export const userRouter = express()
 const userController = new UserController()
 userRouter.post("/signup",(req,res,next)=>{
userController.signup(req,res,next)
 })
 userRouter.post("/signin",(req,res,next)=>{
userController.signin(req,res,next)
 })
  userRouter.post("/logout",jwtAuth,(req,res,next)=>{
userController.logout(req,res,next)
 })
  userRouter.post("/logout-from-all-devices",jwtAuth,(req,res,next)=>{
userController.logoutfromAllDevices(req,res,next)
 })
 
 
 