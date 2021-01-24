
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://t49gbj6rrj793tsj:qpxbrvda1yaw0fhi@z5zm8hebixwywy9d.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/oaenv6t14vkzhj6k');


const Series = sequelize.define('series', {
    title: {
      type: Sequelize.STRING,
      field: 'title' 
    },
    description: {
      type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING,
        field: 'title' 
      },
    likes: {
    type: Sequelize.INTEGER,
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  const Story = sequelize.define('story', {
    title: {
      type: Sequelize.STRING,
      field: 'title' 
    },
    description: {
      type: Sequelize.TEXT('long')
    },
    audio_length: {
        type: Sequelize.INTEGER
      },
    audio_url: {
    type: Sequelize.STRING
    },
    artwork: {
        type: Sequelize.STRING
      },

  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

//   define fk relationship
  Series.hasMany(Story, {
    foreignKey: {
      name: 'series_id',
      allowNull: false
    }
  })



//   sequelize.sync().then(function(){
//     return Series.create({
//         title: "series 1",
//         description: "body text",
//         img: "www.img.com",
//         likes: 4

//     })
//   })
    //     return Story.create({title:title,body:body, series_id: lid})


//   sequelize.sync().then(function(){Series.findAll({where: {id: lid}}).then(function(obj){
//     //     return Story.create({title:title,body:body, series_id: lid})
//   //sync tables
  
    // Table created
function createStory(lid, title, body, artwork, audio_length, audio_url) {
    sequelize.sync().then(function(){Series.findAll({where: {id: lid}}).then(function(obj){
    return Story.create({title:title,description:body, series_id: lid, artwork: artwork, audio_length: audio_length, audio_url:audio_url})
})
})
}
    
createStory(1, "story3","body", "artwork", 121, "www.audio.com")
    





