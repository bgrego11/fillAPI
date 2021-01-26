const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://t49gbj6rrj793tsj:qpxbrvda1yaw0fhi@z5zm8hebixwywy9d.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/oaenv6t14vkzhj6k');


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.series = require("./series.model.js")(sequelize, Sequelize);
db.story = require("./story.model.js")(sequelize, Sequelize);

db.series.hasMany(db.story, {
    foreignKey: {
      name: 'series_id',
      allowNull: false
    }
  })

  module.exports = db;