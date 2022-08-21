module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wokers', [
      {
        name: 'Vasiliy',
        email: 'email@list.ru',
        tel: +79772811111,
        password: '123',
        lat: 0,
        lon: 0,

      },
      {
        name: 'Denchik',
        email: 'mail@bk.ru',
        tel: +79263451607,
        password: '123',
        lat: 0,
        lon: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wokers', null, {});
  },
};
