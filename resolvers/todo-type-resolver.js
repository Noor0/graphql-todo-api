module.exports = {
	id(todo, args) {
		return todo.id;
	},
	userId(todo, args) {
		return todo.userId
	},
	text(todo, args) {
		return todo.description;
	},
	status(todo, args) {
		return todo.status;
	},
};
