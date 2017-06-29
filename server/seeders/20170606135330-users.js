'use strict';

const bcrypt = require('bcrypt');

const salt = 7;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Batman',
        firstName: 'Bruce',
        secondName: 'Wayne',
        password: bcrypt.hashSync('ifearbats33', salt),
        email: 'batman@cave.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        username: 'Riddler',
        firstName: 'Edgar',
        secondName: 'Nigma',
        password: bcrypt.hashSync('iamenigma33', salt),
        email: 'riddler@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
      {
        username: 'Superman',
        firstName: 'Clark',
        secondName: 'Kent',
        password: bcrypt.hashSync('supermanrock33', salt),
        email: 'super@man.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
