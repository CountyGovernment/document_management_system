const { DocumentRouter } = require('./documents.route');
const { RoleRouter } = require('./roles.route');

module.exports = (app) => {
  app.use('/api', RoleRouter);
  app.use('/api', DocumentRouter);
};
