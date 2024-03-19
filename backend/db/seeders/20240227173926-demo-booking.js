"use strict";

// const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require("../models");
let options = { tableName: "Bookings" };
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
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2023-01-01",
          endDate: "2023-01-08",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2023-02-01",
          endDate: "2023-02-08",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2023-03-01",
          endDate: "2023-03-08",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2023-04-01",
          endDate: "2023-04-08",
        },
        {
          spotId: 5,
          userId: 5,
          startDate: "2023-05-01",
          endDate: "2023-05-08",
        },
        {
          spotId: 6,
          userId: 5,
          startDate: "2023-07-06",
          endDate: "2023-07-13",
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
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3, 4, 5],
        },
      },
      {}
    );
  },
};
