module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    
  title:{ 
      type: DataTypes.STRING,
      allowNull:false
  },

  body: {
      type: DataTypes.TEXT('long'),
      allowNull: true
  },
});
//when comment is deleted, post will be deleted
/*Post.associate = function(models) {
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };


Post.associate = function(models) {
    // Associating post with comment
    // When an post is deleted, also delete any associated comment
    Post.hasMany(models.Category, {
      foreignKey:{
        allowNull:false
      }
    });
  };

  Post.associate = function(models) {
    Post.hasMany(models.User, {
      foreignKey:{
        allowNull:false
      }
    });
  };*/




  return Post;
};
