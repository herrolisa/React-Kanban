'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [{
      title : 'Sales Report',
      priority: 2,
      created_by: 'Sales Manager',
      assigned_to: 'Student Intern',
      status_id: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Expense Report',
      priority: 7,
      created_by: 'Executive Director',
      assigned_to: 'Accountant',
      status_id: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Buy Office Supplies',
      priority: 5,
      created_by: 'Executive Director',
      assigned_to: 'Office Manager',
      status_id: 2,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Plan New Employee Orientation',
      priority: 4,
      created_by: 'Human Resource Director',
      assigned_to: 'Human Resource Director',
      status_id: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Make Me A Sandwich!',
      priority: 10,
      created_by: 'Executive Director',
      assigned_to: 'Student Intern',
      status_id: 3,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks');
  }
};
