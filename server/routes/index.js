const { DocumentRouter } = require('./documents.route');
const { RoleRouter } = require('./roles.route');
const { UserRouter } = require('./users.route');

module.exports = (app) => {
  app.use('/api', RoleRouter);
  app.use('/api', DocumentRouter);
  app.use('/api', UserRouter);
};
