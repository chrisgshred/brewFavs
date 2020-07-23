module.exports = function (sequelize, DataTypes) {
    const UserFavBeer = sequelize.define("UserFavBeer", {
        beerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Beers',
                key: 'id'
            } 
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    UserFavBeer.associate = function (models) {
        UserFavBeer.hasMany(models.Beer, {
            foreignKey: "id",
            constraints: false, allowNull:true, defaultValue:null
        });
        UserFavBeer.hasMany(models.User, {
            foreignKey: "userId",
            //added the below code to avoid cyclic dependecy error
            constraints: false, 
            allowNull:true, 
            defaultValue:null
        });
    };
    return UserFavBeer;
};
