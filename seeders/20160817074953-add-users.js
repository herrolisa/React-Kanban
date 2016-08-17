'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'Manager',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Director',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Intern',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users');
  }
};
