const { User } = require('../models');
const controllerHelpers = require('../helpers/controllerHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'yellow';
const salt = 7;

/* Defines  Document Controller methods */
class UserController {

  /**
    * create method
    * Creates a user
    * @params req
    * @params res
    * @return { object } - A res to the user
  */
  create(req, res) { // route handler
    if (controllerHelpers.validateInput(req.body)) {
      // console.log(req.body, 'inputs');
      return res.status(403).json({ // forbidden req
        message: 'Input fields required!',
      });
    }

    return User
      .create({ // req
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email,
        roleId: req.body.roleId || 2,
      })
      .then((user) => { // res
        res.status(201).json({ // req was successful
          message: 'User created successfully!',
          user,
        });
      })
      .catch(error => res.status(400).json(error));
  }

  // Login a user
  login(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({ // forbidden req
        message: 'Email and Password are required',
      });
    } else {
      return User
        .findOne(
        { where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            return res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {
            // console.log(user, 'user');
            if (bcrypt.compareSync(req.body.password, user.password)) {
              const token = jwt.sign({ data: user.roleId, userId: user.id }, secretKey, {
                expiresIn: '1hr',
              });
              return res.status(201).json(Object.assign({},
                { id: user.id, username: user.username, email: user.email, message: 'You are logged in' },
                { token }));
              // return token
            }
            // return error: Password is incorrect
            return res.status(401).json({
              message: 'Could not log in kindly check your login details',
            });
          }
        })
        .catch(error => res.status(400).json(error));
    }
  }

  // logout a user
  logout(req, res) {
    res.setHeader['x-access-token'] = ' ';
    res.status(200)
      .json({
        success: true,
        message: 'User logged out',
      });
  }

  /**
   * list method
   * Lists all users
   * @params req
   * @params res
   * @return { object } - A res to the user
 */
  list(req, res) {
    if (req.query.limit || req.query.offset) {
      return User
        .findAll({
          limit: req.query.limit,
          offset: req.query.offset,
        })
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'There are no users yet!',
            });
          }
          res.status(200).json(user);
        })
        .catch(error => res.status(400).json(error));
    }
    return User
      .all()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * find method
   * Find a user by the id given
   * @params req
   * @params res
   * @return { object } - A res to the user
 */
  find(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'We could not find this user :(',
          });
        }
        return res.status(200).json(user);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * update method
   * Updates a user
   * @params req
   * @params res
   * @return { object } - A res to the user
 */
  update(req, res) {
    if (controllerHelpers.validateInput(req.body)) {
      return res.status(403).json({
        message: 'Please make changes in order to update this user.',
      });
    }

    const updateData = req.body;
    return User
      .update(updateData,
      {
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).json({
        message: 'Your changes have been successfully applied',
      }))
      .catch(error => res.status(400).json(error));
  }

  /**
   * delete method
   * Deletes a user
   * @params req
   * @params res
   * @return { object } - A res to the user
 */
  delete(req, res) {
    return User
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).json({ message: 'User successfully deleted' }))
      .catch((error) => {
        res.status(400).json(error, {
          message: 'User does not exist!',
        });
      });
  }

  /**
   * findByName method
   * Finds a user by username
   * @params req
   * @params res
   * @return { object } - A res to the user
 */
  findByName(req, res) {
    if (req.query.q) {
      return User
        .findAll({
          where: {
            username: { $eq: req.query.q },
          },
        })
        .then((user) => {
          if (user.length === 0) {
            return res.status(404).json({
              message: 'We could not find this user',
            });
          }
          return res.status(200).json(user);
        })
        .catch(error => res.status(400).json(error));
    }
  }
}

module.exports = new UserController();
