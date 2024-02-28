"use strict";

/** @type {import('sequelize-cli').Migration} */

const { Review } = require("../models");

let options = { tableName: "Reviews" };
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
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          review: "Beautiful building with lots of food. Will visit again!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2,
          review: "Awesome musical venue! Lots of parking available",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review:
            "Historical venue with lots of great comics. There is not a bad seat in the house",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 4,
          review: "Great family outing. A lot of history has been captured.",
          stars: 2,
        },
        {
          spotId: 5,
          userId: 5,
          review: "Rude cashier ruined the day for my family.",
          stars: 1,
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return (
      queryInterface.bulkDelete,
      (options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {})
    );
  },
};
