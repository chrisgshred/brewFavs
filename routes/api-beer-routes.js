const db = require("../models");
sequelize = require("sequelize");

module.exports = function (app) {
    app.post("/api/beer", (req, res) => {
        db.Beer.create({
            name: req.body.name,
            style: req.body.style,
            ounces: req.body.ounces
        }).then(() => {
            res.redirect(307, "/profile");
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.get("/api/beer", (req, res) => {
        db.Beer.findAll({
            limit: 10,
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.name.toLowerCase() + '%'),
                style: sequelize.where(sequelize.fn('LOWER', sequelize.col('style')), 'LIKE', '%' + req.query.style.toLowerCase() + '%'),
                ounces: sequelize.where(sequelize.fn('LOWER', sequelize.col('ounces')), 'LIKE', '%' + req.query.ounces.toLowerCase() + '%')
            }
        }).then((dbPost) => {
            console.log(dbPost);
            res.json(dbPost);
        }).catch(err => {
            res.status(401).json(err);
        });

    });
}