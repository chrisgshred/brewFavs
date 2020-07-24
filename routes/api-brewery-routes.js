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
        let lookupValue = req.body.name.toLowerCase();

        db.Brewery.findAll({
            limit: 10,
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + lookupValue + '%')
            }
        }).then((dbPost) => {
            console.log(dbPost);
            res.redirect(307, "/profile");
        }).catch(err => {
            res.status(401).json(err);
        });
    });
}