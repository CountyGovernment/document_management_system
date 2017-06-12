'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'role',
          as: 'user',
        });
      },
    },
  });
  return Role;
};
