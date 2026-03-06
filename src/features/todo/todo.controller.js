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
const page =parseInt(req.query.page)||1
const limit = parseInt(req.query.limit)||10;
const skip=(page-1)*limit
const filters={}
if(req.query.title){
    filters.title={$regex:req.query.title,$options:"i"};
}
if(req.query.status){
    filters.status =req.query.status
}
const sortField =req.query.sortBy||"createdAt";
const sortOrder=req.query.order=="desc"?-1:1;
const todos = await this.todoRepository.getTodoList(filters,skip,limit,sortField,sortOrder);
const total =await this.todoRepository.countTodos(filters);
return res.status(200).json({data:todos,page,limit,total})
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