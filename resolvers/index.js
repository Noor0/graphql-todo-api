const todoById = require('./todoById-resolver');
const todos = require('./todos-resolver');
const user = require('./user-resolver');
const createTodo = require('./createTodo-mutation');
const deleteTodos = require('./deleteTodos-mutation');
const updateTodo = require('./updateTodo-mutation');
const Todo = require('./todo-type-resolver');
const User = require('./user-type-resolver');
const Status = require('./status-type-resolver');

module.exports = {
	Query: {
		todoById,
		todos,
		user
	},
	Mutation: {
		createTodo,
		deleteTodos,
		updateTodo
	},
	Todo,
	User,
	Status
};
