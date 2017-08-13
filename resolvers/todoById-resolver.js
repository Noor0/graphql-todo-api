const { Todo } = require('../db');

module.exports = async (root, args, context) => {
	return await Todo.find({
		where:{ id : { $eq: args.id }, userId: { $eq: context.id } }
	}).then( todo => {
		return todo.toJSON();
	}).catch(() => ({}));
};
