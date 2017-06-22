const jwt = require('jsonwebtoken');
const Role = require('../models').Role;

const secret = 'yellow';

class Authenticate {
    /**
   * validateToken
   * @param {Object} req object
   * @param {Object} res object
   * @param {Object} next object
   * @returns {Object} res message
   */
  validateToken(req, res, next) {
    // console.log('validate token');
    // console.log('validate token is being called');
    // console.log('validate token', req.headers['x-access-token']);
    // console.log('req token', req.headers['x-access-token']);
    // localStorage.setItem('shelftoken', req.headers['x-access-token']);
    // const token = localStorage.shelftoken;
    // console.log('validated token', token);
    // const token = req.headers['x-access-token'] || localStorage.shelftoken;
    const token = req.headers.authorization;
    if (!token) {
      console.log('I can\'t find a token');
      return res.status(401).send({
        status: 401,
        message: 'Token required to access this route',
      });
    }
    return jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          status: 'Invalid token',
          message: 'Token authentication failed.',
        });
      }
      req.decoded = decoded;
      next();
    });
  }

    /**
   * validateAdmin
   * @param {Object} req object
   * @param {Object} res object
   * @param {Object} next object
   * @returns {Object} res message
   */
  validateAdmin(req, res, next) {
    return Role.findById(req.decoded.data)

      .then((role) => {
        // if the role does not exist
        if (!role) {
          return res.status(404).send({
            message: 'Role does not exist!',
          });
        }
        //  if not admin
        if (role.title !== 'admin') {
          return res.status(403).send({
            message: 'You are not permitted to perform this action',
          });
        }

        return next();
      })
      .catch((error) => { console.log(error); res.status(400).json(error); });
  }

}

module.exports = new Authenticate();
