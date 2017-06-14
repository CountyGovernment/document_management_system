const jwt = require('jsonwebtoken');
const Role = require('../models').Role;

const secret = process.env.SECRET_KEY;

class Authenticate {
    /**
   * validateToken
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateToken(request, response, next) {
    const token = request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return response.status(400).send({
            status: 'Invalid token',
            message: 'Token authentication failed.'
          });
        }
        request.decoded = decoded;
        next();
      });
    }
    else {
      return response.status(400).send({
        status: 400,
        message: 'Token required to access this route'
      });
    }
  }

    /**
   * validateAdmin
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @returns {Object} response message
   */
  validateAdmin(request, response, next) {
    return Role.findById(request.decoded.data)
    
      .then((role) => {
        console.log(data,'jjjjj');
        // if the role does not exist
        if(!role) {
          return response.status(401).send({
            message: 'Role does not exist!'
          });
        }
        //  if not admin
        if (role.title !== 'admin') {
          return response.status(401).send({
            message: 'You are not permitted to perform this action'
          });
        } 

        return next()
      })
      .catch(error => { console.log(error); response.status(400).json(error)});
  }

}

module.exports = new Authenticate;
