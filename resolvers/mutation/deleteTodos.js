const { Todo } = require('../../db');
const promiseResolver = require('../../utils/promise-resolver');

module.exports = async (root, args, context) => {
  return await Todo.destroy({
    where: {
      userId: { $eq: context.id },
      id: { $in: args.ids },
    },
  })
    .then(hasDeleted => promiseResolver(hasDeleted))
    .catch(err => ({ done: false, message: err.message }));
};
