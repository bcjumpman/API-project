"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
let options = { tableName: "SpotImages" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Salesforce_Tower_from_Salesforce_Park.jpg/800px-Salesforce_Tower_from_Salesforce_Park.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/04/flex-rooms.jpg?w=889&h=500",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://variety.com/wp-content/uploads/2021/04/Hollywood-Bowl-shell-with-patrons-in-Box-Seats.-Photo-by-Adam-Latham-e1617978504906.jpg?w=1000&h=563&crop=1&resize=681%2C383",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://beverlypress.com/wp-content/uploads/2023/03/arts-HollywoodBowlAward.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.ctfassets.net/1aemqu6a6t65/60AksK8fMux0IYzka9ypIL/5304b87d646d4f6f32346e0423e301a2/theapollo_kateglicksberg-0105?w=1200&h=800&q=75",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://www.apollotheater.org/app/uploads/2021/11/3.-Apollo-Interior-1-1620x1080.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://ids.si.edu/ids/deliveryService?id=https://www.si.edu/sites/default/files/images/nmaahc-1000x675.jpg&max_w=600",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://www.culturetype.com/wp-content/uploads/2017/09/NMAAHC_credit-alankarchmer_516.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://lp-cms-production.imgix.net/2021-09/national-civil-rights-museum-shutterstock_519192739.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://www.desmoinesregister.com/gcdn/-mm-/a5076e7a43a0cec6129489319d0fb728e2cd1814/c=0-264-5184-3193/local/-/media/2017/12/27/IAGroup/DesMoines/636499991402308776-EL8V2802.JPG?width=660&height=373&fit=crop&format=pjpg&auto=webp",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
