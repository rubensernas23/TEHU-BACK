'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agrega las operaciones para eliminar los campos de la tabla 'devices'
    await queryInterface.removeColumn('devices', 'lat_start');
    await queryInterface.removeColumn('devices', 'lat_end');
    // Repite este proceso para cada campo que deseas eliminar
  },

  async down(queryInterface, Sequelize) {
    // Si es necesario, aquí puedes definir la lógica para revertir los cambios
    // Por ejemplo, puedes volver a agregar los campos eliminados
    await queryInterface.addColumn('devices', 'lat_start', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('devices', 'lat_end', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // Repite este proceso para cada campo que eliminaste en 'up'
  }
};
