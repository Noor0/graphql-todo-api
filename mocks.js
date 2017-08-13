const casual = require('casual');

module.exports = {
	Query: (rootValue, args, context) => {
		return {
			user: {
				id: casual.integer(1, 1000),
				fullName: casual.full_name,
				email: casual.email
			},
			todoById: {
				id: casual.integer(1, 1000),
				userId: casual.integer(1, 1000),
				text: casual.sentence,
				status: casual.coin_flip
			}
		};
	}
};
