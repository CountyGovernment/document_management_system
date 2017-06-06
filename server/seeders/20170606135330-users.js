'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Batman',
        firstName: 'Bruce',
        secondName: 'Wayne',
        password: 'ifearbats33',
        email: 'batman@cave.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
      },
      {
        username: 'Riddler',
        firstName: 'Edgar',
        secondName: 'Nigma',
        password: 'iamenigma33',
        email: 'riddler@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
      },
      {
        username: 'Superman',
        firstName: 'Clark',
        secondName: 'Kent',
        password: 'supermanrock33',
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
