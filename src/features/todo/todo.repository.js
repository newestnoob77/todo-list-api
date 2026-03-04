
import { ReturnDocument } from "mongodb"
import { todoModel } from "./todo.model.js"

export default class TodoRepository{
    async createTodoList(todoData){
const newTodo= new todoModel(todoData)
await newTodo.save()
return newTodo
    }
    async getTodoList(){
return await todoModel.find()
    }
    async uploadTodoList(todoId,updateData){
return await todoModel.findOneAndUpdate({_id:todoId},{$set:updateData},{returnDocument:"after"})
    }

}