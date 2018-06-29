module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
     
    
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      
    });
  
  

    Comment.associate = function(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      });
    };   
  return Comment;
};
  