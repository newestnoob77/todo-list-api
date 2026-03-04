import { ApplicationError } from "../../middleware/application.Error.js";
import { todoModel } from "./todo.model.js";
import TodoRepository from "./todo.repository.js";

export default class TodoController{
    constructor(){
this.todoRepository = new TodoRepository
    }
        async createTodoList(req,res,next){
try{
const{userId}=req.params;
const{title,description}=req.body
const todoData={userId,title,description}
const result =await this.todoRepository.createTodoList(todoData)
if(!result) return res.status(400).send("Failed to create Todo list")
return res.status(201).send(result)
}catch(err){
    console.log(err)
    throw new ApplicationError("Failed to create Todo list")
}
    }
    async getTodoList(req,res,next){
        try{
const result = await this.todoRepository.getTodoList()
if(!result ) return res.status(400).send("Failed to get todo list ")
 return res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong")
        }

    }
    async uploadTodoList(req,res,next){
try{
    const {todoId}=req.params
const result =await  this.todoRepository.uploadTodoList(todoId,req.body)

console.log(result)
if(!result) return res.status(200).send("todolist not found")
return res.status(200).send(result)
}catch(err){
    console.log(err)
    throw new ApplicationError("Something went wrong")
}
    }
    async deleteTodoList(req,res,next){
       try {
        const {todoId}=req.params;
        const result = await todoModel.findByIdAndDelete(todoId)
        if(!result)return res.status(400).send("Deletion failed")
        return res.status(200).send("Deleted successfully")
    }catch(err){
        console.log(err)
        throw new ApplicationError("Something went wrong")
    }
    }
}