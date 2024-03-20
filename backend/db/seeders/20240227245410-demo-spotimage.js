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
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/staples2.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/kobe%20statue1.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/staples.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/laker%20floor.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/noucamp1.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820707/ncwide.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820707/nccrowd.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710956247/noucamp6.webp",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/oc1.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/oc2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/op3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710823099/oc4.webp",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820707/mb1.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/mb2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820707/mb3.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/mb4.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/ys1.webp",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/ys2.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/ys3.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820709/ys4.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/chelsea1.webp",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/chelsea2.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820707/chelsea3.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://res.cloudinary.com/dkjaxm35z/image/upload/v1710820708/chelsea4.webp",
          preview: false,
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {}
    );
  },
};
