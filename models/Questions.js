module.exports = function(sequelize, DataTypes){
    var Question = sequelize.define("Question", {

        title:
        { 
            type: DataTypes.TEXT,
            allowNull:false,
            validate: {
              len: [1]
            }
        },
        location: {
        type:DataTypes.STRING,
        },
    
        Question:
        {
          type:DataTypes.TEXT,
          allowNull:false,
         validate: {
             len:[1]
         }
        },

    });

    Question.associate = function (models) {
        Question.hasMany(models.Answer, {
            foreignKey: {
                allowNull:false
            }

        })
    
    }


return Question;




}