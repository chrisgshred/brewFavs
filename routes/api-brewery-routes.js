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
        db.Brewery.findAll({
            limit: 10,
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.name.toLowerCase() + '%'),
                city: sequelize.where(sequelize.fn('LOWER', sequelize.col('city')), 'LIKE', '%' + req.query.city.toLowerCase() + '%'),
                state: sequelize.where(sequelize.fn('LOWER', sequelize.col('state')), 'LIKE', '%' + req.query.state.toLowerCase() + '%')
            }
        }).then((dbPost) => {
            res.json(dbPost);
        }).catch(err => {
            res.status(401).json(err);
        });
    });
}