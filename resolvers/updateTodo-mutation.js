const { Todo } = require('../db');
const promiseResolver = require('../utils/promise-resolver');

module.exports = async (root, args, context) => {
	if (args.status !== undefined && typeof args.status === 'boolean')
		return await Todo.update({
			status: args.status
		}, {
			where: {
				id: { $eq: args.id },
				userId: { $eq: context.id }
			}
		}).then(hasUpdated => promiseResolver(hasUpdated[0]))
		.catch(err => ({ done: false, message: err.message }));

	if (args.text !== undefined && args.text.length > 0)
		return await Todo.update({
			description: args.text
		}, {
			where: {
				id: { $eq: args.id },
				userId: { $eq: context.id }
			}
		}).then(hasUpdated => promiseResolver(hasUpdated[0]))
		.catch(err => ({ done: false, message: err.message }));

}
