'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'elixir',
        content: 'truth of life',
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: 'merchant',
        content: 'a seller traveller',
        access: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'light',
        content: 'the thing that makes you see',
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Documents', null, {});
  },
};
