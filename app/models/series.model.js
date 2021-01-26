
module.exports = (sequelize, Sequelize) => {


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
          },
        likes: {
        type: Sequelize.INTEGER,
        }
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });
    
      return Series;
    
    }