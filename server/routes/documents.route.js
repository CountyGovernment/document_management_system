const Router = require('express').Router();
const { Document } = require('../controllers');

/* /documents routes */
Router.route('/documents')
  .post(Document.create);

/* /documents/:id routes */
Router.route('/documents/:id')
  .get(Document.find);

/* search/documents routes */
Router.route('/search/documents/')
  .get(Document.findByTitle);

module.exports.DocumentRouter = Router;
