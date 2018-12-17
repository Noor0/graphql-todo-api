const todoById = require('./query/todoById');
const todos = require('./query/todos');
const user = require('./query/user');
const createTodo = require('./mutation/createTodo');
const deleteTodos = require('./mutation/deleteTodos');
const updateTodo = require('./mutation/updateTodo');
const Todo = require('./type/todo');
const User = require('./type/user');
const Status = require('./type/status');

module.exports = {
  Query: {
    todoById,
    todos,
    user,
  },
  Mutation: {
    createTodo,
    deleteTodos,
    updateTodo,
  },
  Todo,
  User,
  Status,
};
