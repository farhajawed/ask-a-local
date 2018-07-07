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
<<<<<<< HEAD
    // We're saying that a Post should belong to a Category
    // A Post can't be created without a category due to the foreign key constraint
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
    Post.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
   
  };

  return Post;
};
