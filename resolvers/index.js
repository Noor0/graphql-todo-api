const todoById = require('./todoById-resolver');
const todos = require('./todos-resolver');
const user = require('./user-resolver');
const Todo = require('./todo-type-resolver');
const User = require('./user-type-resolver');
const Status = require('./status-type-resolver');

module.exports = {
	Query: {
		todoById,
		todos,
		user
	},
	Todo,
	User,
	Status
};
