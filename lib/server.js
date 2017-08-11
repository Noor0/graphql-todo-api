import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import helmet from 'helmet';
import schema from './todo-schema';

const app = express();
const port = process.env.PORT || 8080;

// setting security middleware
app.use(helmet());

// function to be used by graphqlExpress middleware
// to return 'options' object for graphQL configuration
const graphqlOptions = req => ({
	schema,
	rootValue: { rootValue: 'rootValue' },
	context: { context: 'context' }
});

// setting graphQL endpoint
app.use('/gql', bodyParser.json(), graphqlExpress(graphqlOptions));

// setting graphiQL endpoint
app.use('/', graphiqlExpress({ endpointURL: '/gql' }));

app.listen(port, () => { console.log('server started') });
