
module.exports = (sequelize, Sequelize) => {


    const Section = sequelize.define('section', {
        title: {
          type: Sequelize.STRING,
          field: 'title' 
        },
        sub_title: {
          type: Sequelize.STRING,
        },
        
        text: {
          type: Sequelize.TEXT('long')
        },
        order: {
          type: Sequelize.INTEGER
        },
       
    
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });
    
      return Section;
    
    }