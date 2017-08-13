const user = require('./user-resolver');
const Todo = require('./todo-type-resolver');
const User = require('./user-type-resolver');
const Status = require('./status-type-resolver');

module.exports = {
	Query: {
		user
	},
	Todo,
	User,
	Status
};
