'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      { roletitle: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { roletitle: 'regular', createdAt: new Date(), updatedAt: new Date() },
      { roletitle: 'guest', createdAt: new Date(), updatedAt: new Date() },
      { roletitle: 'facilitator', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
