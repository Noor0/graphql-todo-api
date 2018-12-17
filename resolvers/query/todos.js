const { Todo } = require('../../db');

module.exports = async (root, args, context) => {
  const { status, search } = args;

  const where = { userId: { $eq: context.id } };
  if (typeof status === 'boolean') where.status = { $eq: status };
  if (typeof search === 'string') where.description = { $like: `%${search}%` };

  return await Todo.findAll({
    where,
  }).then(todosObj => {
    return todosObj.map(todo => todo.dataValues);
  });
};
