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
      price: 777.00
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
      price: 555.00
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
      price: 400.00
     },
     {
      ownerId: 4,
      address: '298 Pilgrim Lane',
      city: 'Hixson',
      state: 'Texas',
      country: 'United States',
      lat: 75.757575,
      lng: 64.636261,
      name: 'Cowhouse',
      description: 'Outdoor patio and ranch farm',
      price: 333.00
     },
     {
      ownerId: 4,
      address: '7837 State Avenue',
      city: 'Medford',
      state: 'Massachusetts',
      country: 'United States',
      lat: 54.654375,
      lng: 35.947858,
      name: 'Matrix',
      description: 'Quiet neighborhood',
      price: 375.00
     },
     {
      ownerId: 2,
      address: '980 North Theatre Street',
      city: 'Macon',
      state: 'Georgia',
      country: 'United States',
      lat: 75.894378,
      lng: 62.464758,
      name: 'Georgian',
      description: 'Perfect place to vacation!',
      price: 462.00
     },
     {
      ownerId: 3,
      address: '9958 Crescent Street',
      city: 'Simpsonville',
      state: 'South Carolina',
      country: 'United States',
      lat: 47.857686,
      lng: 82.489528,
      name: 'Simpsons',
      description: 'Model home for model guests!',
      price: 678.00
     },
     {
      ownerId: 1,
      address: '8218 Miller Avenue',
      city: 'Dallas',
      state: 'Georgia',
      country: 'United States',
      lat: 35.456789,
      lng: 54.321654,
      name: 'Doubles',
      description: 'Bunkbeds galore! Perfect home for a big family.',
      price: 414.00
     },
     {
      ownerId: 5,
      address: '56 Ohio Lane',
      city: 'Drexel Hill',
      state: 'Maryland',
      country: 'United States',
      lat: 31.894509,
      lng: 44.444444,
      name: 'Drexler',
      description: 'Hot spot for this location. Book before it fills!',
      price: 770.00
     },
     {
      ownerId: 1,
      address: '98 Brickell Lane',
      city: 'West Orange',
      state: 'New Jersey',
      country: 'United States',
      lat: 57.575757,
      lng: 76.677667,
      name: 'Orange',
      description: 'Very unique home! Positive experiences only!',
      price: 450.00
     },
     {
      ownerId: 2,
      address: '1 Euclid Road',
      city: 'Round Lake',
      state: 'Illinois',
      country: 'United States',
      lat: 30.030303,
      lng: 50.543213,
      name: 'RoundHouse',
      description: 'Best home in the MidWest!',
      price: 630.00
     },
     {
      ownerId: 4,
      address: '7553 Wild Rose Street',
      city: 'Downingtown',
      state: 'Maine',
      country: 'United States',
      lat: 79.876567,
      lng: 77.545565,
      name: 'Rose',
      description: 'Beautiful rose garden on Rose Street!',
      price: 880.00
     },
     {
      ownerId: 5,
      address: '183 North Walnutwood Lane',
      city: 'Avon Lake',
      state: 'Ohio',
      country: 'United States',
      lat: 46.654564,
      lng: 93.456745,
      name: 'Walnut',
      description: 'Huge backyard for the kids!',
      price: 659.00
     },
     {
      ownerId: 1,
      address: '8234 West Annadale Drive',
      city: 'Eastpointe',
      state: 'Missouri',
      country: 'United States',
      lat: 42.435642,
      lng: 63.565432,
      name: 'Annacove',
      description: 'Many local restaurants nearby!',
      price: 510.00
     },
     {
      ownerId: 3,
      address: '55 Wintergreen Lane',
      city: 'Jackson Heights',
      state: 'New York',
      country: 'United States',
      lat: 38.958473,
      lng: 58.858372,
      name: 'Jackson',
      description: '10 minute walk to Times Square! Many festivites nearby',
      price: 900.00
     },
     {
      ownerId: 2,
      address: '8 Franklin Avenue',
      city: 'Clover',
      state: 'South Carolina',
      country: 'United States',
      lat: 75.754322,
      lng: 46.575421,
      name: 'WildClover',
      description: 'Lots of attractions nearby. Guaranteed to have a great time!',
      price: 730.00
     },
     {
      ownerId: 4,
      address: '7677 Addison Street',
      city: 'Skokie',
      state: 'Florida',
      country: 'United States',
      lat: 37.895843,
      lng: 64.436574,
      name: 'Gator',
      description: '20 minute drive to Miami. Great vacation spot!',
      price: 480.00
     },
     {
      ownerId: 5,
      address: '757 Paris Hill Court',
      city: 'Plainview',
      state: 'New York',
      country: 'United States',
      lat: 68.543452,
      lng: 65.643225,
      name: 'Refreshment',
      description: 'Built-in sauna room for maximum relaxation! Positive reviews!',
      price: 1170.00
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
