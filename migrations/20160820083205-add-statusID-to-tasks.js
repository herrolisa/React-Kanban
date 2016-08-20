'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .addColumn('Tasks', 'status_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        foreignKey: true,
        references: {
          model: 'Statuses',
          key: 'id'}
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .removeColumn('Tasks', 'status_id');
  }
};
