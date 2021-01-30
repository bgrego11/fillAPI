
module.exports = (sequelize, Sequelize) => {


    const UserProgress = sequelize.define('userprogress', {
        user_id: {
          type: Sequelize.INTEGER,
        }
      }, {
        freezeTableName: true // Model tableName will be the same as the model name
      });
    
      return UserProgress;
    
    }