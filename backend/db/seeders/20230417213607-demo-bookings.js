'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 3,
      startDate: '2023-05-17',
      endDate: '2023-05-25'
     },
     {
      spotId: 2,
      userId: 2,
      startDate: '2023-06-11',
      endDate: '2023-06-24'
     },
     {
      spotId: 3,
      userId: 1,
      startDate: '2023-07-23',
      endDate: '2023-07-30'
     }
   ], {});
   },

   async down (queryInterface, Sequelize) {
     /**
      * Add commands to revert seed here.
      *
      * Example:
      * await queryInterface.bulkDelete('People', null, {});
      */
     options.tableName = 'Bookings';
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {});
   }
 };
