const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const { sequelize, User, Token } = require('./db');
const schema = require('./todo-schema');

const app = express();
const port = process.env.PORT || 8080;
const json = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: true });

// setting security middleware
app.use(helmet());

// setting up express-jwt middleware
app.use(expressJWT({secret: 'secret'}).unless({
	path: ['/user/signup', '/user/login', '/giql']
}));

// function to be used by graphqlExpress middleware
// to return 'options' object for graphQL configuration
const graphqlOptions = req => {
	return {
		schema,
		rootValue: { rootValue: 'rootValue' },
		context: req.user
	}
};

// setting graphQL endpoint
app.use('/gql', json, graphqlExpress(graphqlOptions));

// setting graphiQL endpoint
app.use('/giql', graphiqlExpress({ endpointURL: '/gql' }));

// -----------------------------------------------------------------------------
// route for creating new user
app.post('/user/signup', urlencoded, (req, res)=>{
	User.create({
		email: req.body.email,
		password: req.body.password
	}).then( user => {
		res.status(200).json(user.toPublicJSON());
	})
	.catch( err => {
		res.status(400).send(err.errors[0].type === 'unique violation' 
			? err.errors[0].message : 'email is not formated correctly');
	});
});
// -----------------------------------------------------------------------------

sequelize.sync().then(()=>{
	app.listen(port, () => { console.log('server started') });
});
