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
            unique : true
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

    Brewery.associate = function (models) {
        Brewery.hasMany(models.Beer,{
          foreignKey:"beerId"
        });
      };
    return Brewery;
};
