"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "https://blurpie.files.wordpress.com/2008/05/wowscrnshot_052608_150923.jpg",
        },
        {
          reviewId: 2,
          url: "test2",
        },
        {
          reviewId: 3,
          url: "test3",
        },
        {
          reviewId: 4,
          url: "test4",
        },
        {
          reviewId: 5,
          url: "test5",
        },
      ],
      { validate: true }
    );
  },

  //   async down(queryInterface, Sequelize) {
  //     options.tableName = "ReviewImages";
  //     const Op = Sequelize.Op;
  //     return queryInterface.bulkDelete(options, {
  //       reviewId: {
  //         [Op.in]: [1, 2, 3],
  //       },
  //     });
  //   },
  // };

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options);
  },
};
