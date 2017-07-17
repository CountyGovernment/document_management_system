const Router = require('express').Router();
const { User } = require('../controllers/controllers');
const Authenticate = require('../authentication/authentication');

Router.route('/users')
  .post(User.create);

Router.route('/users/login')
  .post(User.login);

/* /users routes */
Router.route('/users')
  .get(Authenticate.validateToken, Authenticate.validateAdmin, User.list);

/* /users/?limit={}&offset={} */

Router.route('/users')
  .get(Authenticate.validateToken, User.list);

/* /users/:id routes */
Router.route('/users/:id')
  .delete(Authenticate.validateToken, Authenticate.validateAdmin, User.delete)
  .get(Authenticate.validateToken, User.find)
  .put(Authenticate.validateToken, User.update);

Router.route('/users/:id/documents')
  .get(Authenticate.validateToken, User.findUserDocs);

/* search/users routes */
Router.route('/search/users/')
  .get(Authenticate.validateToken, User.findByName);

module.exports.UserRouter = Router;
