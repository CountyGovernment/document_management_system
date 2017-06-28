const Router = require('express').Router();
const { User } = require('../controllers/controllers');
const Authenticate = require('../authentication/authentication');

// Router.route('/users/login')
//   .post(User.login);

// /* /users routes */
// Router.route('/users')
//   .post(User.create)
//   .get(Authenticate.validateToken, Authenticate.validateAdmin, User.list);

// /* /users/?limit={}&offset={} */

// Router.route('/users')
//   .get(Authenticate.validateToken, Authenticate.validateAdmin, User.list);

// /* /users/:id routes */
// Router.route('/users/:id')
//   .delete(Authenticate.validateToken, Authenticate.validateAdmin, User.delete)
//   .get(Authenticate.validateToken, Authenticate.validateAdmin, User.find)
//   .put(Authenticate.validateToken, Authenticate.validateAdmin, User.update);

// Router.route('/users/:id/documents')
//   .get(Authenticate.validateToken, User.findUserDocs);

// /* search/users routes */
// Router.route('/search/users')
//   .get(Authenticate.validateToken, Authenticate.validateAdmin, User.findByName);


// Router.route('/users/logout')
//   .post(Authenticate.validateToken, User.logout);

// module.exports.UserRouter = Router;

Router.route('/users/login')
  .post(User.login);

/* /users routes */
Router.route('/users')
  .post(User.create)
  .get(User.list);

/* /users/?limit={}&offset={} */

Router.route('/users')
  .get(User.list);

/* /users/:id routes */
Router.route('/users/:id')
  .delete(User.delete)
  .get(User.find)
  .put(User.update);

Router.route('/users/:id/documents')
  .get(User.findUserDocs);

/* search/users routes */
Router.route('/search/users')
  .get(User.findByName);


Router.route('/users/logout')
  .post(Authenticate.validateToken, User.logout);

module.exports.UserRouter = Router;