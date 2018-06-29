var bcrypt = require('bcrypt');


module.exports =function (sequelize,DataTypes) {
 
    var User = sequelize.define("User", {

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    token: DataTypes.STRING,
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    bio: DataTypes.TEXT,
    image:
        {
            type:DataTypes.STRING
    }}, {
        // hooks: {
        //   beforeCreate: (user) => {
        //     const salt = bcrypt.genSaltSync();
        //     user.password = bcrypt.hashSync(user.password, salt);
        //   }
        // },
        instanceMethods: {
          validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
          }
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