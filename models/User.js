module.exports =function (sequelize,DataTypes) {
 
    var User = sequelize.define("User", {

    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    bio: DataTypes.TEXT,
    image:
    {
            type:DataTypes.STRING
    }
    });


    User.associate = function (models) {
        models.User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
        models.User.hasMany(models.Post, {

            onDelete: "cascade"
        });
    };




  

return User;

}