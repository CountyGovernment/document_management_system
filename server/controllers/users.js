const { User } = require('../models');
const { Document } = require('../models');
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
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email,
        roletitle: req.body.roletitle || 'regular',
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({ success: false, message: 'Please fill in user details' });
        } else {
          res.status(201).json({
            message: 'User created successfully!',
            user,
          });
        }
      })
      .catch((error) => {
        res.status(400).json(error, {
          message: 'Please fill in user details',
        });
      });
  }

  // Login a user
  login(req, res) {
    return User
      .findOne(
      { where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({ success: false, message: 'User not found! Check if your login credentials are correct' });
        } else if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ data: user.roletitle, id: user.id }, secretKey, {
              expiresIn: '24hr',
            });
            return res.status(201).json(Object.assign({},
              { id: user.id, data: user.roletitle, username: user.username, email: user.email, message: 'You are logged in' },
              { token }));
          }
          // return error: Password is incorrect
          else {
            return res.status(401).json({
              message: 'Incorrect password!',
            });
          }
        }
      })
      .catch(error => res.status(400).json(error));
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
        return res.status(200).json(user);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * find method
   * Find the documents of a user by the id given
   * @params req
   * @params res
   * @return { object } - A res to the user
 */
  findUserDocs(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Document,
          as: 'document',
        }],
      })
      .then((user) => {
        return res.status(200).send(user);
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
    const updateData = req.body;
    return User
      .update(updateData,
      {
        where: {
          id: req.params.id,
        },
      })
      .then(user =>
      res.status(201).json({
        user,
        message: 'User Successfully updated!',
      }),
      )
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
            username: { $iLike: `%${req.query.q}%` },
          },
        })
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch(error => res.status(400).json(error));
    }
  }
}

module.exports = new UserController();
