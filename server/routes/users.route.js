const Router = require('express').Router();
const { User } = require('../controllers/controllers');
const Authenticate = require("../authentication/authentication");

/* /users routes */
Router.route('/users')
  .post(User.create)
  .get(Authenticate.validateToken, Authenticate.validateAdmin, User.list);

/* /users/:id routes */
Router.route('/users/:id')
  .delete(Authenticate.validateToken, Authenticate.validateAdmin, User.delete)
  .get(Authenticate.validateToken, Authenticate.validateAdmin, User.find)
  .put(Authenticate.validateToken, Authenticate.validateAdmin, User.update);

/* search/users routes */
Router.route('/search/users')
  .get(Authenticate.validateToken, Authenticate.validateAdmin, User.findByName);

Router.route('/users/login')
  .post(User.login)

Router.route('/users/logout')
  .post(Authenticate.validateToken, User.logout)

module.exports.UserRouter = Router;
