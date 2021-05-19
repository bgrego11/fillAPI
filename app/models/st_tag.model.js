
module.exports = (sequelize, Sequelize) => {


    const St_Tag = sequelize.define('st_tag', {
        story_id: {
          type: Sequelize.INTEGER,

        },
        tag: {
          type: Sequelize.STRING  
        }

    
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });
    
      return St_Tag;
    
    }