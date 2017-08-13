const { User } = require('../db');

module.exports = async (root, args, context) => {
	return await User.find({
		where: {
			id: {
				$eq: context.id
			}
		}
	}).then((user) => user.dataValues)
	.catch(() => ({}));
};
