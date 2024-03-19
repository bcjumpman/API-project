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
          address: "1111 S Figueroa Street",
          city: "Los Angeles",
          state: "California",
          country: "United States of America",
          lat: 34.043087,
          lng: -118.267616,
          name: "STAPLES Center",
          description:
            "Sports and entertainment center of the world. Home to the Los Angeles Kings, Los Angeles Lakers, Los Angeles Clippers and Los Angeles Sparks.",
          price: 100.99,
        },
        {
          ownerId: 2,
          address: "d'Arístides Maillol, 12",
          city: "Les Corts",
          state: "Barcelona",
          country: "Spain",
          lat: 41.380898,
          lng: 2.12282,
          name: "Nou Camp",
          description:
            "Camp Nou, branded as Spotify Camp Nou for sponsorship reasons, is an under-renovation stadium home of La Liga club Barcelona since its opening in 1957.",
          price: 200.99,
        },
        {
          ownerId: 3,
          address: "24 Willie Mays Plaza",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.778572,
          lng: -122.389717,
          name: "Oracle Park",
          description:
            "Since 2000, it has served as the ballpark of Major League Baseball's San Francisco Giants.",
          price: 300.99,
        },
        {
          ownerId: 4,
          address: "1 AMB Dr NW",
          city: "Atlanta",
          state: "Georgia",
          country: "United States of America",
          lat: 33.7553,
          lng: 84.4006,
          name: "Mercedes-Benz Stadium",
          description:
            "Mercedes-Benz Stadium is a multi-purpose stadium located in Atlanta, Georgia, United States.",
          price: 222.89,
        },
        {
          ownerId: 5,
          address: "1 E 161 Street",
          city: "Bronx",
          state: "New York",
          country: "United States of America",
          lat: 40.8296,
          lng: 73.926186,
          name: "Yankee Stadium",
          description:
            "Yankee Stadium is a baseball stadium located in the Bronx in New York City.",
          price: 500.99,
        },
        {
          ownerId: 5,
          address: "Fulham Rd. SW6 1HS",
          city: "London",
          state: "England",
          country: "United Kingdom",
          lat: 51.4817,
          lng: 0.191,
          name: "Stamford Bridge",
          description:
            "Stamford Bridge is a football stadium in Fulham, adjacent to the borough of Chelsea in West London.",
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
        ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {}
    );
  },
};
