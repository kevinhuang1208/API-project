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
      review: 'Enjoyed my stay here. Will definitely come again.',
      stars: 4
     },
     {
      spotId: 5,
      userId: 1,
      review: 'Was not clean when we arrived. Needed to clean everything ourselves.',
      stars: 2
     },
     {
      spotId: 6,
      userId: 1,
      review: 'Best home I ever stayed in! It was a great time and I would love to come again.',
      stars: 5
     },
     {
      spotId: 7,
      userId: 1,
      review: 'Mediocre.',
      stars: 3
     },
     {
      spotId: 8,
      userId: 2,
      review: 'Worst home I stayed in. Ever.',
      stars: 1
     },
     {
      spotId: 9,
      userId: 2,
      review: 'Loved the outdoor festivites nearby. Would come again!',
      stars: 4
     },
     {
      spotId: 10,
      userId: 2,
      review: 'Better than a hotel with full rooms service.',
      stars: 5
     },
     {
      spotId: 11,
      userId: 3,
      review: 'Home was smaller than they listed. Do not be fooled!',
      stars: 2
     },
     {
      spotId: 12,
      userId: 3,
      review: 'Average at best.',
      stars: 3
     },
     {
      spotId: 13,
      userId: 3,
      review: 'Nothing to compliment, nothing to complain. This home is the epitome of mediocrity, which is not necessarily a bad thing.',
      stars: 3
     },
     {
      spotId: 14,
      userId: 4,
      review: '5-star hotel-esque!',
      stars: 5
     },
     {
      spotId: 15,
      userId: 4,
      review: 'Excellent time!',
      stars: 5
     },
     {
      spotId: 16,
      userId: 4,
      review: 'It was a good home. Just a little too far from everywhere.',
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
