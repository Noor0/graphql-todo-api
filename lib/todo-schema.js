import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const typeDefs = `
type Todo {
	id: ID!
	userId: ID!
	text: String!
	status: Boolean!
}

type User {
	id: ID!
	fullName: String!
	email: String!
}

input UniqueTodo {
	todoId: ID!
	userId: ID!
}

type Query {
	todoById(input: UniqueTodo): Todo
	updateTodo(input: UniqueTodo): Todo
	todos(userId: ID!): Todo
	user(userId: ID!): User
}
`;

let schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema, mocks })

export default schema;
