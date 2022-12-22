"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        email: "sontung@gmail.com",
        address: "Hà Nội",
        password: "2222222",
        firstName: "Hà Nội",
        lastName: "Hà Nội",
        phoneNumber: "00000000",
        gender: "1",
        roleId: "3",
        // createAt: new Date(),
        // updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
