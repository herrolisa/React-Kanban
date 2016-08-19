'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [{
      title : 'Sales Report',
      priority: 22,
      created_by: 'Sales Manager',
      assigned_to: 'Student Intern',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Expense Report',
      priority: 47,
      created_by: 'Executive Director',
      assigned_to: 'Accountant',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Buy Office Supplies',
      priority: 85,
      created_by: 'Executive Director',
      assigned_to: 'Office Manager',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Plan New Employee Orientation',
      priority: 58,
      created_by: 'Human Resource Director',
      assigned_to: 'Human Resource Director',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : 'Make Everyone a Sandwich',
      priority: 58,
      created_by: 'Executive Director',
      assigned_to: 'Student Intern',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks');
  }
};
