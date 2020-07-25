module.exports = function (sequelize, DataTypes) {
    const Brewery = sequelize.define("Brewery", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        breweryId: {
            type: DataTypes.INTEGER,
            unique : true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {timestamps: false});

   /*  Brewery.associate = function (models) {
        Brewery.hasMany(models.Beer,{
          foreignKey:"beerId"
        });
      }; */
      Brewery.associate = function (models) {
        Brewery.belongsTo(models.UserFavBrewery, {
            foreignKey: "id",
            constraints: false, 
            allowNull:true, 
            defaultValue:null
        });
    };
    return Brewery;
};
