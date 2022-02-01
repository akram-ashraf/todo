publicRoutes = {
  "POST /create": "todoController.createTodo",
  "GET /list": "todoController.getTodo",
  "GET /get/:id": "todoController.getOne",
  "PUT /edit": "todoController.updateTodo",
  "DELETE /delete": "todoController.deleteTodo",
};
module.exports = { publicRoutes };
