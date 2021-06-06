
module.exports = (sequelize, Sequelize) => {


    const Carousel = sequelize.define('carousel', {
        dt_url: {
          type: Sequelize.STRING
        },
        dt_route_name: {
          type: Sequelize.STRING,
        },
        mb_url: {
          type: Sequelize.STRING
        },
        mb_route_name: {
          type: Sequelize.STRING,
        }
       
    
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });
    
      return Carousel;
    
    }