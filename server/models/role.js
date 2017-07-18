'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roletitle: {
      type: DataTypes.STRING,
      required: true,
      primaryKey: true,
      unique: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roletitle',
          as: 'user',
        });
      },
    },
  });
  return Role;
};
