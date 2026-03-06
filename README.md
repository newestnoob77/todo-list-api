# todo-list-api
simple todo list backend api  which has two features todo and users. Users mainly consist of signin,signup,logout,logout from all devices.Todo features contains of creating,retreving,updating and deleting todo list.The type of security used in this project is jwt Authentication which has refresh token for long duration and also access token.Rate limiting,sorting ,filtering has also been used in this project.This project follows a structure modular file folder both of the features has a sepearte folder and have 4 files in this a controller ,repository,model and router file.https://roadmap.sh/projects/todo-list-api
Api Routes:
USERS ROUTER:
api/users/signin method:post,
api/users/signup method:post,
api/users/logut method:post,
api/users/logout-from-all-devices method:post,
TODO Router:
api/todos/ method:get,
api/todos/:userId method:post,
ap[i/todos/:todoId method:put,
ap[i/todos/:todoId method:delete
