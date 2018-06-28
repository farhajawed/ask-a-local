module.exports = function(sequelize,DataTypes) {

    var Category = sequelize.define("Category", {
    
        name: DataTypes.STRING
    
    });
    
        Category.associate=function(models) {
    
            models.Category.hasMany(models.Post,{
            foreignKey: {
                allowNull:true
            }
        });
    
    }
    return Category;
    
    }