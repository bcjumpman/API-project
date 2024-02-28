"use strict";

const { Spot } = require("../models");

/** @type {import('sequelize-cli').Migration} */

let options = {};
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
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 Circle Lane",
          city: "San Francisco",
          state: "California",
          country: "Asgard",
          lat: 37.7897,
          lng: -122.3991439,
          name: "Salesforce Tower",
          description:
            "Formerly known as Transbay Tower, is a 61-story skyscraper",
          price: 100.99,
        },
        {
          ownerId: 2,
          address: "123 Sunset Boulevard",
          city: "Los Angeles",
          state: "California",
          country: "Wakanda",
          lat: 34.1122,
          lng: 118.3391,
          name: "Hollywood Bowl",
          description: "Amphitheatre in the Hollywood Hills ",
          price: 200.99,
        },
        {
          ownerId: 3,
          address: "253 W 125th Street",
          city: "New York",
          state: "New York",
          country: "Wakanda",
          lat: 40.81,
          lng: 73.9501,
          name: "Apollo Theater",
          description: "Popular venue for Black American performers",
          price: 300.99,
        },
        {
          ownerId: 4,
          address: "1400 Constitution Ave. NW",
          city: "Washington",
          state: "District of Columbia",
          country: "Wakanda",
          lat: 35.9873,
          lng: 35.234,
          name: "National Museum of African American History",
          description:
            "Smithsonian Institution museum located on the National Mall",
          price: 77.89,
        },
        {
          ownerId: 5,
          address: "450 Mulberry Street",
          city: "Memphis",
          state: "Tennessee",
          country: "Wakanda",
          lat: 35.13,
          lng: -90.06,
          name: "National Civil Rights Museum",
          description:
            "A complex of museums and historic buildings in Memphis, Tennessee",
          price: 500.99,
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
