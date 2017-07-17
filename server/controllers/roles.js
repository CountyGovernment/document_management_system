const { Role } = require('../models');

/* Defines Role Controller methods */
class RolesController {

  /**
    * create method
    * Creates a role
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  create(req, res) {
    return Role
    .create({
      roletitle: req.body.roletitle,
    })
      .then((role) => {
        res.status(201).json({
          message: 'You have created a role!',
          role,
        });
      })
      .catch(error => res.status(400).json(error));
  }

  /**
    * list method
    * List all roles
    * @params req
    * @params res
    * @return { object } - A response to the user
  */
  list(req, res) {
    return Role
      .all()
      .then(role => res.status(200).json(role))
      .catch(error => res.status(400).json(error));
  }
}

module.exports = new RolesController();
