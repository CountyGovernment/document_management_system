const Router = require('express').Router();
const { Document } = require('../controllers/controllers');

// Creates a new document instance.
/* /documents routes */
Router.route('/documents')
  .post(Document.create);

// Find document using id.
/* /documents/:id routes */
Router.route('/documents/:id')
  .get(Document.find)
  .put(Document.update)
  .delete(Document.delete);

// Search for a doc using title
/* search/documents routes */
Router.route('/search/documents/')
  .get(Document.findByTitle);

module.exports.DocumentRouter = Router;
