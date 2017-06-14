const Router = require('express').Router();
const { Role } = require('../controllers/controllers');
const Authenticate = require("../authentication/authentication");

/* /roles routes */
Router.route('/roles')
  .post(Authenticate.validateToken, Authenticate.validateAdmin, Role.create)
  .get(Authenticate.validateToken, Authenticate.validateAdmin, Role.list);

module.exports.RoleRouter = Router;

