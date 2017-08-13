const winston = require('winston');

const normal = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      name: 'ip-log-file',
      filename: 'ip-log.json',
      level: 'info'
    }),
    new winston.transports.File({
      name: 'error-file',
      filename: 'error-log.json',
      level: 'error'
    })
  ]
});

const query = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
    name: 'query-file',
    filename: 'query-log.json',
    level: 'info'
  })
  ]
})

module.exports = {
  normal,
  query
};
