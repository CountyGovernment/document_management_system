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
        password: bcrypt.hashSync('batman', salt),
        email: 'batman@cave.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roletitle: 'admin',
      },
      {
        username: 'Riddler',
        firstName: 'Edgar',
        secondName: 'Nigma',
        password: bcrypt.hashSync('riddler', salt),
        email: 'riddler@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roletitle: 'guest',
      },
      {
        username: 'Superman',
        firstName: 'Clark',
        secondName: 'Kent',
        password: bcrypt.hashSync('superman', salt),
        email: 'super@man.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roletitle: 'regular',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
