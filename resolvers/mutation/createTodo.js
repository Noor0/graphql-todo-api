const { Todo } = require('../../db');

module.exports = async (root, args, context) => {
  if (args.text)
    return await Todo.create({
      userId: context.id,
      description: args.text,
    })
      .then(todo => todo.dataValues)
      .catch(err => ({ text: err.message }));
  else return { text: 'empty string is not allowed' };
};
