'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        name: 'Aulia Rahman',
        profession: 'Admin Micro',
        role: 'admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Shilki',
        profession: 'Grapich Design',
        role: 'student',
        email: 'shilki@gmail.com',
        password: await bcrypt.hash('shilki', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
