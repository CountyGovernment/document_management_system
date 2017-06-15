const Router = require('express').Router();
const { Role } = require('../controllers/controllers');
const Authenticate = require('../authentication/authentication');

Router.use(Authenticate.validateToken, Authenticate.validateAdmin);
/* /roles routes */
Router.route('/roles')
  .post(Role.create)
  .get(Role.list);

module.exports.RoleRouter = Router;

