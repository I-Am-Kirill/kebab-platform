'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wokers', [
      {
        name: 'Vasiliy',
        email: 'email@list.ru',
        tel: +79772811111,
        password: '123'

      },
      {
        name: 'Denchik',
        email: 'mail@bk.ru',
        tel: +79263451607,
        password: '123'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
