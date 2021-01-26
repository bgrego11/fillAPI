
module.exports = (sequelize, Sequelize) => {


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
    
      return Story;
    
    }