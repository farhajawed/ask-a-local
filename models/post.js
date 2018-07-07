module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    
  title:
  { 
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        len: [1]
      }
  },
  image:
  {
    type:DataTypes.STRING,
    allowNull:true,
    defaultValue:"default.png"
  },

  body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  Post.associate = function(models) {
    Post.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });

    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
   
  };

  return Post;
};
