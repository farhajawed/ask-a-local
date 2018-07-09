module.exports = function(sequelize, DataTypes){
    var Answer = sequelize.define("Answer", {
    
        Answer:
        {
          type:DataTypes.TEXT,
           allowNull:false,
         validate: {
             len:[1]
         }
        },

    })

return Answer;




}