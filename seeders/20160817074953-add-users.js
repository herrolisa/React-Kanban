'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'Executive Director',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Sales Manager',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Human Resource Director',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Accountant',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Office Manager',
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      username : 'Student Intern',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users');
  }
};
