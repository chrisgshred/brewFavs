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
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        abv: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        ibu: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        beerId: {
            type: DataTypes.INTEGER,
            unique: true,
            defaultValue: 0
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
            },
            defaultValue: 0 
        },
        ounces: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        }
    },
    {timestamps: false}
    );

    Beer.associate = function (models) {
        Beer.belongsTo(models.Brewery,{
          foreignKey: "breweryId"
        });
      };
    return Beer;
};
