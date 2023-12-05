const Sequelize = require('sequelize');

// const sequelize = new Sequelize('mysql://ben:hotdogboy79@thefill.c4dakz7il1rp.us-east-2.rds.amazonaws.com:3306/thefilldb');

const sequelize = new Sequelize('mysql://fmeb96hg9t60ns21:c0ld6b5cyp4tynt9@frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ldaili7sc7z49reo');

// const sequelize = new Sequelize('mysql://root:null@localhost:3306/thefilldb');


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.series = require("./series.model.js")(sequelize, Sequelize);
db.story = require("./story.model.js")(sequelize, Sequelize);
db.section = require("./section.model.js")(sequelize, Sequelize);
db.userprogress = require("./userprogress.model.js")(sequelize, Sequelize);
db.st_tag = require("./st_tag.model.js")(sequelize, Sequelize);
db.carousel = require("./carousel.model.js")(sequelize, Sequelize);

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

db.story.hasMany(db.st_tag, {
  foreignKey: {
    name: 'story_id',
    allowNull: false
  }

})

db.story.hasMany(db.section, {
  foreignKey: {
    name: 'story_id',
    allowNull: false
  }

})

module.exports = db;