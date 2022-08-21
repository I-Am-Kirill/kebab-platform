module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        name: 'Пирог Осетинский',
        wokerId: 1,
        location: '26 Бакинских Комиссаров, 16',
        status: 'available',
        price: '500rub',
        discont: '250rub',
        description: 'yes',
        img: '123',
        lat: 55.661833,
        lon: 37.486306,
      },
      {
        name: 'БигБургер',
        wokerId: 1,
        location: 'Орджонекидзе 10, стр 11',
        status: 'available',
        price: '750rub',
        discont: '400rub',
        description: 'yes',
        img: '123',
        lat: 55.710335,
        lon: 37.592862,

      },
      {
        name: 'Суши сет "Де Люкс',
        wokerId: 2,
        location: 'Вешних вод 8',
        status: 'available',
        price: '1500rub',
        discont: '750rub',
        description: 'yes',
        img: '123',
        lat: 55.857597,
        lon: 37.699265,
      },
      {
        name: 'Стейк Рибай "medium rare"',
        wokerId: 1,
        location: 'Проспект вернадского 105',
        status: 'available',
        price: '2500rub',
        discont: '1500rub',
        description: 'yes',
        img: 'img',
        lat: 55.663253,
        lon: 37.486074,
      },
      {
        name: 'Салат "Цезарь"',
        wokerId: 1,
        location: 'пр-кт Мира 31 стр 1',
        status: 'available',
        price: '400rub',
        discont: '200rub',
        description: 'yes',
        img: '123',
        lat: 55.780086,
        lon: 37.632739,
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  },
};
