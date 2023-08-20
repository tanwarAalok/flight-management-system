'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "SD101",
        capacity: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "SD102",
        capacity: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "SD103",
        capacity: 700,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airplanes', {});
  }
};
