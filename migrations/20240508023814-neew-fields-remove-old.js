'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('devices', 'destination', {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('devices', 'destination');
    await queryInterface.removeColumn('devices', 'lgn_start');
    await queryInterface.removeColumn('devices', 'lgn_end');
  }
};
