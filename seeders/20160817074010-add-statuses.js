'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [{
      status : 'Queue',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      status : 'In Progress',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      status : 'Done',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses');
  }
};
