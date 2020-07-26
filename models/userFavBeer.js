module.exports = function (sequelize, DataTypes) {
    const UserFavBeer = sequelize.define("UserFavBeer");
    return UserFavBeer;
};
