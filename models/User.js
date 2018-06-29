module.exports =function (sequelize,DataTypes) {
 
    const User = sequelize.define("User", {

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
        models.User.hasMany(models.Image, {

            onDelete: "cascade"
        });
    };




  

return User;

}