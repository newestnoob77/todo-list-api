
import { ReturnDocument } from "mongodb"
import { todoModel } from "./todo.model.js"

export default class TodoRepository{
    async createTodoList(todoData){
const newTodo= new todoModel(todoData)
await newTodo.save()
return newTodo
    }
    async getTodoList(filters, skip, limit, sortField, sortOrder){
return (await todoModel.find(filters).skip(skip).limit(limit)).toSorted({[sortField]:sortOrder})
    }
    async countTodos(filters){
        return await todoModel.countDocuments(filters)
    }
    async uploadTodoList(todoId,updateData){
return await todoModel.findOneAndUpdate({_id:todoId},{$set:updateData},{returnDocument:"after"})
    }

}