module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    
  title:
  { 
      type: DataTypes.STRING,
      allowNull:false
  },
  image:
  {
    type:DataTypes.STRING
  },

  body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
