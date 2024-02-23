"use strict";

/** @type {import('sequelize-cli').Migration} */

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "brian@user.io",
          username: "brianUser",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "alisa@user.io",
          username: "alisaUser",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "sebas@user.io",
          username: "sebasUser",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["brianUser", "alisaUser", "sebasUser"] },
      },
      {}
    );
  },
};
