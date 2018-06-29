module.exports =function (sequelize,DataTypes) {
 
    var User = sequelize.define("User", {

        email: {
            type: DataTypes.STRING,
            allowNull:false
        },

    password: {
        type: DataTypes.STRING,
        allowNull:false
    },

    image:
        {
            type:DataTypes.TEXT
    },


    fullname:DataTypes.STRING,


    bio: DataTypes.TEXT,


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