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
          review:
            "So many basketball greats played in the House that Kobe Built!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2,
          review:
            "Seeing Messi and Neymar on the same team was perfect. The crowd was very electric!",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review:
            "Amazing World Cup qualifying game. The weather was perfect for a day game.",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 4,
          review: "Amazing venue concert venue, we caught Kanye West live!",
          stars: 2,
        },
        {
          spotId: 5,
          userId: 5,
          review: "So much history at this stadium and the boys loved it.",
          stars: 4,
        },
        {
          spotId: 6,
          userId: 5,
          review: "Amazing stadium and the Blues won!",
          stars: 5,
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {})
    );
  },
};
