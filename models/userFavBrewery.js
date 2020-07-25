module.exports = function (sequelize, DataTypes) {
    const UserFavBrewery = sequelize.define("UserFavBrewery", {
        breweryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Breweries',
                key: 'id'
            } 
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    UserFavBrewery.associate = function (models) {
        UserFavBrewery.belongsTo(models.Brewery, {
            foreignKey: "id",
            constraints: false, 
            allowNull:true, 
            defaultValue:null
        });
        UserFavBrewery.belongsTo(models.User, {
            foreignKey: "userId",
            //added the below code to avoid cyclic dependecy error
            constraints: false, 
            allowNull:true, 
            defaultValue:null
        });
    };
    return UserFavBrewery;
};
