const Router = require('express').Router();
const { Role } = require('../controllers');

/* /roles routes */
Router.route('/roles')
  .post(Role.create)
  .get(Role.list);

module.exports.RoleRouter = Router;

