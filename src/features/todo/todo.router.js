import express from 'express'
import TodoController from './todo.controller.js'
const todoController = new TodoController()
export const todoRouter= express.Router()
todoRouter.post("/:userId",(req,res,next)=>{
    todoController.createTodoList(req,res,next)
})
todoRouter.get("/",(req,res,next)=>{
    todoController.getTodoList(req,res,next)
})
todoRouter.put("/:todoId",(req,res,next)=>{
    todoController.uploadTodoList(req,res,next)
})

todoRouter.delete("/:todoId",(req,res,next)=>{
    todoController.deleteTodoList(req,res,next)
})