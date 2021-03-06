const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const crypto = require('crypto-js');
const { sequelize, User, Token } = require('./db');
const ATP = require("./authorizeToProceed.js")(User, Token);
const schema = require('./todo-schema');
const logger = require('./setup-logger');

const app = express();
const port = process.env.PORT || 8080;
const json = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: true });
const queryLogger = (req, res, next) => {
	logger.query.info(`${req.connection.remoteAddress} queried`, {
		query: req.body
	});
	next();
}

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
		formatError: (e) => (logger.normal.error(e), e),
		context: req.user
	}
};

// setting graphQL endpoint
app.use('/gql', ATP, json, queryLogger, graphqlExpress(graphqlOptions));

// options object for graphiql
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVTJGc2RHVmtYMS9HMGdZMXY1YnBTU3JGNGRSVHJKZzMwcThEeXBqNUhhSExjS0VSQXR3TTdyNXNLdXM0UGRScW1SdTVNZ3Z3RSsvN0RsUi9NaWVmUkE9PSIsImlhdCI6MTUwMjYzODI3OX0.kHUAgY-7mmPdT2b57bRHZZ2-qnnDfpoWBqNXbpkq2RY';
const options = {
	endpointURL: '/gql',
	passHeader: `'Authorization': 'Bearer ${token}'`
}
// setting graphiQL endpoint
app.use('/giql', graphiqlExpress(options));

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

//route for logging user in and returning a token
app.post('/user/login', urlencoded, (req, res)=>{
	if(req.body.email
		&& req.body.password.length
		&& req.body.password.length >= 5){
		User.findOne({
			where: {
				email: {
					$eq: req.body.email
				}
			}
		}).then( user => {
			if(user == null)
				res.status(401).json({message: 'user not found'});

			let hash = crypto.SHA256(req.body.password+""+user.get('salt'));
			if( user.get('pass_hash') ===  hash.toString()){
				let token = user.genToken('authentication');
				Token.create({
					token,
					userId: user.get('id')
				}).then( ()=> res.status(200).send(token) )
				.catch( err => res.status(500).send(err) );

			}
			else
				throw new Error('incorrect password');
		}).catch( err => res.status(400).json(err.message) );
	}
	else
		res.status(400).send('incorrect email/password');
});

// route for logging out a user
app.get("/user/logout", ATP,(req,res)=>{
	let token = req.headers.authorization.split(" ")[1];
	let tokenHash = crypto.MD5(token).toString();
	Token.destroy({
		where:{
			token_hash:{
				$eq: tokenHash
			}
		}
	}).then( token => {
		console.log(token);
		res.status(200).end();
	}).catch( e => res.status(401).send(e) );
});
// -----------------------------------------------------------------------------

sequelize.sync().then(()=>{
	app.listen(port, () => { console.log('server started') })
	.on('connection', (socket) => {
		logger.normal.info(`${socket.remoteAddress} connected`);
	});
});
