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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      url: 'https://i.ibb.co/Qb2jfr4/Home1.jpg',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://i.ibb.co/FYDM1ky/Home2.jpg',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://i.ibb.co/NKXMbT4/Home3.jpg',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://i.ibb.co/7G5kLcW/Home4.jpg',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://i.ibb.co/5kFWpQx/Home5.jpg',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://i.ibb.co/1vP4kHc/Home6.jpg',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://i.ibb.co/0J8PqFL/Home7.jpg',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://i.ibb.co/HtdTTPq/Home8.jpg',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://i.ibb.co/4T42dyq/Home9.jpg',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://i.ibb.co/f9F2mJp/Home10.jpg',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://i.ibb.co/2dWRCDc/Home11.jpg',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://i.ibb.co/4mgZbr2/Home12.jpg',
      preview: false
     },
     {
      spotId: 13,
      url: 'https://i.ibb.co/z5M8sNy/Home13.jpg',
      preview: false
     },
     {
      spotId: 14,
      url: 'https://i.ibb.co/sPqDwcJ/Home14.jpg',
      preview: false
     },
     {
      spotId: 15,
      url: 'https://i.ibb.co/swWT7fp/Home15.jpg',
      preview: false
     },
     {
      spotId: 16,
      url: 'https://i.ibb.co/fqYP8sP/Home16.jpg',
      preview: false
     },
     {
      spotId: 17,
      url: 'https://i.ibb.co/9TF2D9M/Home17.jpg',
      preview: false
     },
     {
      spotId: 18,
      url: 'https://i.ibb.co/fv8rDjS/Home18.jpg',
      preview: false
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
     options.tableName = 'SpotImages';
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {});
   }
 };
