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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
     {
      ownerId: 1,
      address: '456 Commander Avenue',
      city: 'Baltimore',
      state: 'Maryland',
      country: 'United States',
      lat: 75.555555,
      lng: 88.888888,
      name: 'Colony',
      description: 'Definitely a place you need to visit!',
      price: 1200.00
     },
     {
      ownerId: 2,
      address: '567 Cajun Street',
      city: 'San Jose',
      state: 'California',
      country: 'United States',
      lat: 93.993393,
      lng: 27.456788,
      name: 'Westie',
      description: '4 beds, huge living room for gatherings',
      price: 1700.00
     },
     {
      ownerId: 3,
      address: '789 Dellie Road',
      city: 'Seattle',
      state: 'Washington',
      country: 'United States',
      lat: 55.555555,
      lng: 65.656565,
      name: 'Earthquake',
      description: 'Furnished and friendly neighborhood!',
      price: 1300.00
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
     options.tableName = 'Spots';
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {});
   }
 };
