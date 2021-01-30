const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://ben:hotdogboy79@thefill.c4dakz7il1rp.us-east-2.rds.amazonaws.com:3306/thefilldb');


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.series = require("./series.model.js")(sequelize, Sequelize);
db.story = require("./story.model.js")(sequelize, Sequelize);
db.userprogress = require("./userprogress.model.js")(sequelize, Sequelize);

db.series.hasMany(db.story, {
    foreignKey: {
      name: 'series_id',
      allowNull: false
    }
  })


db.story.hasMany(db.userprogress, {
    foreignKey: {
        name: 'story_id',
        allowNull: false
      }

})

  module.exports = db;