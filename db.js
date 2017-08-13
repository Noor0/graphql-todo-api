const Sequelize = require("sequelize");
const casual = require('casual');

const sequelize = new Sequelize(undefined, undefined, undefined,{
	dialect:"sqlite",
	storage: "./data/database.sqlite",
	logging: false
});

const Todo = sequelize.import("./models/todo.js");
const User = sequelize.import("./models/user.js");
const Token = sequelize.import("./models/token.js");

// DEFINING ASSOCIATIONS
User.hasMany(Todo);
User.hasMany(Token);

// Todo.create({
// 	userId: 1,
// 	description: casual.sentence,
// 	status: casual.coin_flip
// })

module.exports = {
	Todo,
	User,
	Token,
	Sequelize,
	sequelize
};
