module.exports = function(sequelize,DataTypes) {

    var Category = sequelize.define("Category", {
    
<<<<<<< HEAD
        name: DataTypes.STRING
    
    },
=======
        name: {
          type: DataTypes.STRING
        }
    },

>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
    {
        timestamps:false,
    });
    
    Category.associate=function(models) {
        Category.hasMany(models.Post,{
            foreignKey: {
<<<<<<< HEAD
                allowNull: false
            },
            onDelete: "cascade"
    });

    Category.bulkCreate([
        { name: 'Sports'},
        { name: 'Food'},
        { name: 'Fashion'}
      ]).then(() => {
        return Category.findAll();
      }).then(result => {
        console.log(result) // ... in order to get the array of categories
      })
    
    }
    return Category;
    
    }
=======
                allowNull: true  //category can be deleted
            }
            // onDelete: "cascade"
    });
    }
    return Category;
    
}
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
