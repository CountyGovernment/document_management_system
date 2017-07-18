const Router = require('express').Router();
const { Document } = require('../controllers/controllers');
const Authenticate = require('../authentication/authentication');

// Creates a new document instance.
/* /documents routes */
Router.route('/documents')
  .post(Authenticate.validateToken, Document.create)
  .get(Authenticate.validateToken, Document.list);

// Find document using id.
/* /documents/:id routes */
Router.route('/documents/:id')
  .get(Authenticate.validateToken, Document.find)
  .put(Authenticate.validateToken, Document.update)
  .delete(Authenticate.validateToken, Document.delete);

// Search for a doc using title
/* search/documents routes */
Router.route('/search/documents/')
  .get(Authenticate.validateToken, Document.findByTitle);

module.exports.DocumentRouter = Router;
