const db = require("../models");
sequelize = require("sequelize");

module.exports = function (app) {
    app.post("/api/beer", (req, res) => {
        db.Beer.create({
            abv: req.body.abv,
            ibu: req.body.ibu,
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
        let lookupValue;

        if (req.body.name && req.body.name !== "") {
            lookupValue = req.body.name.toLowerCase();

            db.Beer.findAll({
                limit: 10,
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + lookupValue + '%')
                }
            }).then((dbPost) => {
                console.log(dbPost);
                res.json(dbPost);
            }).catch(err => {
                res.status(401).json(err);
            });
        }
        else if (req.body.style && req.body.style !== "") {
            lookupValue = req.body.style.toLowerCase();

            db.Beer.findAll({
                limit: 10,
                where: {
                    style: sequelize.where(sequelize.fn('LOWER', sequelize.col('style')), 'LIKE', '%' + lookupValue + '%')
                }
            }).then((dbPost) => {
                console.log(dbPost);
                res.json(dbPost);
            }).catch(err => {
                res.status(401).json(err);
            });
        } else if (req.body.ounces && req.body.ounces !== "") {
            lookupValue = req.body.ounces.toLowerCase();

            db.Beer.findAll({
                limit: 10,
                where: {
                    ounces: sequelize.where(sequelize.fn('LOWER', sequelize.col('ounces')), 'LIKE', '%' + lookupValue + '%')
                }
            }).then((dbPost) => {
                console.log(dbPost);
                res.json(dbPost);
            }).catch(err => {
                res.status(401).json(err);
            });
        }
    });
}