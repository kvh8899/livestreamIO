"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Videos", [
      {
        userId: 1,
        url: "test",
        title: "test",
        description: "test",
        live: false,
        game: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Videos", null, {});
  },
};
