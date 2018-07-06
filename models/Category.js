module.exports = function(sequelize,DataTypes) {

    var Category = sequelize.define("Category", {
    
        name: {
          type: DataTypes.STRING,
          unique: {
            args: true,
            msg: 'Category exists!'
        }
      }
    });
    
    Category.associate=function(models) {
        Category.hasMany(models.Post,{
            foreignKey: {
                allowNull: true  //category can be deleted
            }
            // onDelete: "cascade"
    });
    }
    return Category;
    
}