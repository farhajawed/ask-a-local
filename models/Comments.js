module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },   
    });
    Comment.associate = function(models) {
        Comment.belongsTo(models.Post, {
          foreignKey: {
            allowNull: true
          }
        });
      }; 
      return Comment;
    };
    
  