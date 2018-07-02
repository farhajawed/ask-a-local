var bcrypt = require('bcrypt');


module.exports =function (sequelize,DataTypes) {
 
    var User = sequelize.define("User", {

    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: {
            args: true,
            msg: 'Username already in use!'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    token: DataTypes.STRING,
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    bio: DataTypes.TEXT,
    token: DataTypes.STRING,
    location: DataTypes.STRING,
    image:
    {
            type:DataTypes.STRING,
            defaultValue:"default.png"
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