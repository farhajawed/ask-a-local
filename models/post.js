module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    
    title:
    { 
      type: DataTypes.STRING,
      allowNull:false
  },

  image:{
    type: {
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.BLOB('long')
    },
    name: {
      type: DataTypes.STRING
    },
  },


  body: {
      type: DataTypes.TEXT,
      allowNull: false
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
