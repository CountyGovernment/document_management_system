const Router = require('express').Router();
const { Document } = require('../controllers');

// Creates a new document instance.
/* /documents routes */
Router.route('/documents')
  .post(Document.create);

// Find document using id.
/* /documents/:id routes */
Router.route('/documents/:id')
  .get(Document.find);

// Search for a doc using title
/* search/documents routes */
Router.route('/search/documents/')
  .get(Document.findByTitle);

// Update document attributes using id.
/* /documents/:id routes */
Router.route('/documents/:id')
  .put(Document.update);

// Delete document using id.
/* /documents/:id routes */
Router.route('/documents/:id')
  .delete(Document.delete);


module.exports.DocumentRouter = Router;
