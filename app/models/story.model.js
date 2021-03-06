
module.exports = (sequelize, Sequelize) => {


    const Story = sequelize.define('story', {
        title: {
          type: Sequelize.STRING,
          field: 'title' 
        },
        description: {
          type: Sequelize.TEXT('long')
        },
        duration: {
            type: Sequelize.INTEGER
          },
        url: {
        type: Sequelize.STRING
        },
        artwork: {
            type: Sequelize.STRING
          },
        type: {
            type: Sequelize.STRING
        },
        album: {
          type: Sequelize.STRING
        }
       
    
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });
    
      return Story;
    
    }