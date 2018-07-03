module.exports = function(sequelize,DataTypes) {

    var Category = sequelize.define("Category", {
    
        name: DataTypes.STRING
    
    },
    {
        timestamps:false,
    });
    
    Category.associate=function(models) {
        Category.hasMany(models.Post,{
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade"
    });

    Category.bulkCreate([
        { name: 'Sports'},
        { name: 'Food'},
        { name: 'Fashion'}
      ]).then(() => {
        return User.findAll();
      }).then(users => {
        console.log(users) // ... in order to get the array of categories
      })
    
    }
    return Category;
    
    }