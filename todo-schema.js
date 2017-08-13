const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const mocks = require('./mocks');
const resolvers = require('./resolvers/index');

const typeDefs = `
type Todo {
	id: ID
	userId: ID
	text: String
	status: Boolean
}

type User {
	id: ID
	email: String
}

type Status {
	done: Boolean
	message: String
}

type Query {
	todoById(id: ID): Todo
	todos(status: Boolean, search: String): [Todo]
	user: User
}

type Mutation {
	createTodo(text: String!): Todo
	updateTodo(id: ID!, status: Boolean, text: String): Status
	deleteTodos(ids:[ID]!): Status
}
`;

let schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema, mocks })

module.exports = schema;
