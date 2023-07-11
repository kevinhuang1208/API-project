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
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/3069af28-5f32-4411-b331-984fed5f9dd9.jpg',
      preview: false
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/c80929b6-6883-47a9-b8c8-26b19c77ae49.jpg',
      preview: false
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52254331/original/86ae1d34-832a-42f1-9fad-0e12915e7754.jpeg',
      preview: false
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52254331/original/c289a506-f74b-437f-807b-edad28f0be9b.jpeg',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://i.ibb.co/FYDM1ky/Home2.jpg',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/92989311/a6973aab_original.jpg',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/92989304/68844d20_original.jpg?',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/92989291/4f64ae22_original.jpg',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/92989320/4bfdea5f_original.jpg',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://i.ibb.co/NKXMbT4/Home3.jpg',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/c0f4f3a8-f86a-4190-b48b-e7522e0d861a.jpg',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/bbdf9cd0-264d-4875-84b4-3d064ee740e4.jpg',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/2f7d586d-d7e4-41a0-8985-a3bc2f7b20fd.jpg',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/c11cc927-4549-478f-8caf-e93c1efd84c3.jpg',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://i.ibb.co/7G5kLcW/Home4.jpg',
      preview: true
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/bb6b2326-6d31-4db2-99d2-b0641e135ca9.jpg',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/4b2c14ab-9e7f-491a-b70d-5ea75817e80e.jpg',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/a7ba8985-42bb-4089-a3b9-a558bcb286d5.jpg',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/92cd4a5b-2c4e-4e11-a747-5e7f59a56851.jpg',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://i.ibb.co/5kFWpQx/Home5.jpg',
      preview: true
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/28c1cb35-a717-4f27-9dbd-3cf4f6608e38.jpg',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48978483/original/b5f176f3-9620-4eb7-a073-d21e1e1c441a.jpeg',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48978483/original/d36179b4-b9b9-454a-a483-e17717986cc7.jpeg',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48978483/original/2754910c-a6d2-4af4-aac6-1c2d2116c3a1.jpeg',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://i.ibb.co/1vP4kHc/Home6.jpg',
      preview: true
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/573e890b-9f10-44e5-8ab2-3eba67d90be2.jpg',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/331dbfee-9ae4-4ca5-8cd4-404c82f8078b.jpg',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/3afcf050-ccec-4964-9f61-648a0754b000.jpg',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/f7d3a053-ce02-4a5c-95cb-427884a4878a.jpg',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://i.ibb.co/0J8PqFL/Home7.jpg',
      preview: true
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/2ad958ec-6ba1-4b14-92a2-809c7a25a46a.jpg',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/07560a25-fb6a-49e9-ab30-e9cb9fac50e4.jpg',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/6390302d-08ec-4534-ade9-5a777c0d4b3b.jpg',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/17d04bc7-d983-42c9-a9f9-2fdc81f31c1c.jpg',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://i.ibb.co/HtdTTPq/Home8.jpg',
      preview: true
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-860031876324024493/original/71e434f7-3ed9-4ae2-960a-837ea52f3bd6.jpeg',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-860031876324024493/original/4906278c-c355-4a89-ae8c-0b530f2244a7.jpeg',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-860031876324024493/original/77a2c16e-a514-4f9d-8b8c-40ec9e957de5.jpeg',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-860031876324024493/original/da74240e-54d3-4032-afab-855497fec771.jpeg',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://i.ibb.co/4T42dyq/Home9.jpg',
      preview: true
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679618966848064864/original/2710c4db-7f56-4899-8873-8d773429aa1b.jpeg',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679618966848064864/original/01b9f741-49de-429d-a7e5-eaab64cbb072.jpeg',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679618966848064864/original/1fdbe6d8-08b7-4615-8841-58c60defaf55.jpeg',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679618966848064864/original/60a05ec0-a436-4e78-b64b-b8cc26b43fd0.jpeg',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://i.ibb.co/f9F2mJp/Home10.jpg',
      preview: true
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-579029977974620351/original/a7c5341b-87de-4b12-b348-56d0190acd13.jpeg',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-579029977974620351/original/7c65524a-0780-4f89-bfe4-2ac7fa60737d.jpeg',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-579029977974620351/original/b2573f3b-8304-4499-893b-24a69e477e9b.jpeg',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-579029977974620351/original/5e416e20-4423-4948-b23b-48f5d65947f6.jpeg',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://i.ibb.co/2dWRCDc/Home11.jpg',
      preview: true
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-691465252115776326/original/63405bdc-75a1-4633-bb0b-eaee1939a697.jpeg',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-691465252115776326/original/711e1e35-6e45-4dc5-a4dd-222eadb066cc.jpeg',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-691465252115776326/original/94bd3501-e6b7-48a1-bf38-d5a205771001.jpeg',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-691465252115776326/original/6fe0cc60-8114-4736-91db-d1aecb935161.jpeg',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://i.ibb.co/4mgZbr2/Home12.jpg',
      preview: true
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47995963/original/3d90eaf3-2da2-49b7-bef0-c7550cb86971.jpeg',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47995963/original/d1fe1630-0a71-48c0-8dee-6ebc0095763e.jpeg',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47995963/original/c803a76a-034f-4b63-ad37-8762a1732352.jpeg',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47995963/original/31722c5e-3ca7-4ec4-b9ce-cdbf52431226.jpeg',
      preview: false
     },
     {
      spotId: 13,
      url: 'https://i.ibb.co/z5M8sNy/Home13.jpg',
      preview: true
     },
     {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824056833186467306/original/c4f73c7b-cfea-4544-9c99-0e69a71d551a.jpeg',
      preview: false
     },
     {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824056833186467306/original/66529860-4acc-43ed-bc2b-aea810798d33.jpeg',
      preview: false
     },
     {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824056833186467306/original/47222f64-7edc-4a5c-900f-e82aa61989f7.jpeg',
      preview: false
     },
     {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824056833186467306/original/760849be-cd4b-4b52-b666-bea70dfadf21.jpeg',
      preview: false
     },
     {
      spotId: 14,
      url: 'https://i.ibb.co/sPqDwcJ/Home14.jpg',
      preview: true
     },
     {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/9d35dc42-a2a0-4628-9858-2d276220425c.jpg',
      preview: false
     },
     {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/3e49ada3-3f8b-472d-a688-6fbd227fea49.jpg',
      preview: false
     },
     {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/ab2d8ddb-992c-40ec-b9bd-7df28be747ca.jpg',
      preview: false
     },
     {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/2145fe71-9654-40a5-b7dd-50c42b2b1ae7.jpg',
      preview: false
     },
     {
      spotId: 15,
      url: 'https://i.ibb.co/swWT7fp/Home15.jpg',
      preview: true
     },
     {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/920b87fe-c791-4c31-bdd7-61c520d925c5.jpg',
      preview: false
     },
     {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/73e8aa39-5142-47e8-96e4-ed623ce7cf39.jpg',
      preview: false
     },
     {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/05c9438f-8a47-4123-b8f6-3aa8bfebc5d2.jpg',
      preview: false
     },
     {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/abe51d3e-9d20-4d25-b3db-785402f491fb.jpg',
      preview: false
     },
     {
      spotId: 16,
      url: 'https://i.ibb.co/fqYP8sP/Home16.jpg',
      preview: true
     },
     {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/207d2218-f3fa-41b5-a2b2-089b27a36256.jpg',
      preview: false
     },
     {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/49aeba7a-4aa7-449b-9ccb-5c74e9d14c7f.jpg',
      preview: false
     },
     {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/5ab08027-ae45-4433-843a-61c8f0c5fa65.jpg',
      preview: false
     },
     {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/be6a3216-bd0d-41a1-826d-c4337c5830de.jpg',
      preview: false
     },
     {
      spotId: 17,
      url: 'https://i.ibb.co/9TF2D9M/Home17.jpg',
      preview: true
     },
     {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48297551/original/ad31bfc5-f12d-433e-8f30-c3ca59800149.jpeg',
      preview: false
     },
     {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48297551/original/14284af1-e2ac-4b13-9ada-12636346f3bc.jpeg',
      preview: false
     },
     {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48297551/original/850c1549-b4c6-48ca-b1f7-1097e8e54cb5.jpeg',
      preview: false
     },
     {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48297551/original/934320e4-7aaa-4505-84d4-883f2a45f0e6.jpeg',
      preview: false
     },
     {
      spotId: 18,
      url: 'https://i.ibb.co/fv8rDjS/Home18.jpg',
      preview: true
     },
     {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/e9703d35-1ca7-46dd-855d-c543c3c62bf0.jpg',
      preview: false
     },
     {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/15b53437-fa6b-42c8-baff-7bd19d7f4b88.jpg',
      preview: false
     },
     {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/4e9ee563-c862-4bdf-97ff-1a0e3f62dd4e.jpg',
      preview: false
     },
     {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/4403b063-c8b0-4f16-94b7-29fa85283e17.jpg',
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
