module.exports = function (sequelize, DataTypes) {
    const Beer = sequelize.define("Beer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        rowNo: {
            type: DataTypes.INTEGER
        },
        abv: {
            type: DataTypes.DECIMAL
        },
        ibu: {
            type: DataTypes.DECIMAL
        },
        beerId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        style: {
            type: DataTypes.STRING
        },
        breweryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Breweries',
                key: 'breweryId'
            } 
        },
        ounces: {
            type: DataTypes.DECIMAL
        }
    });

    Beer.associate = function (models) {
        Beer.belongsTo(models.Brewery,{
          foreignKey: "breweryId"
        });
      };
    return Beer;
};
