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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 3,
      review: 'Complete disaster. Nothing was cleaned when we arrived and there was a smell coming from the air conditioner that we could not get rid of...',
      stars: 1
     },
     {
      spotId: 2,
      userId: 2,
      review: 'Would recommend to anyone! Immediate responses from the homeowner and he satisfied our every need. 5 stars!!!',
      stars: 5
     },
     {
      spotId: 3,
      userId: 1,
      review: 'Nothing to compliment, nothing to complain. This home is the epitome of mediocrity, which is not necessarily a bad thing.',
      stars: 3
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
     options.tableName = 'Reviews';
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {});
   }
 };
