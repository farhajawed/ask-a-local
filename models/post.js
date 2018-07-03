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
    // We're saying that a Post should belong to a Category
    // A Post can't be created without a category due to the foreign key constraint
    Post.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
   
  };

  return Post;
};
