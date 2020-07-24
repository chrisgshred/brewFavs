const db = require("../models");

module.exports = function (app) {
    app.post("/api/brewery", (req, res) => {
        db.Brewery.create({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state
        }).then(() => {
            res.redirect(307, "/profile");
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.get("/api/brewery", (req, res) => {
        let lookupValue;

        if (req.body.name && req.body.name !== "") {
            lookupValue = req.body.name.toLowerCase();

            db.Brewery.findAll({
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
        else if (req.body.city && req.body.city !== "") {
            lookupValue = req.body.city.toLowerCase();
            
            db.Brewery.findAll({
                limit: 10,
                where: {
                    city: sequelize.where(sequelize.fn('LOWER', sequelize.col('city')), 'LIKE', '%' + lookupValue + '%')
                }
            }).then((dbPost) => {
                console.log(dbPost);
                res.json(dbPost);
            }).catch(err => {
                res.status(401).json(err);
            });
        }
        else if (req.body.state && req.body.state !== "") {
            lookupValue = req.body.state.toLowerCase();
            
            db.Brewery.findAll({
                limit: 10,
                where: {
                    state: sequelize.where(sequelize.fn('LOWER', sequelize.col('state')), 'LIKE', '%' + lookupValue + '%')
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