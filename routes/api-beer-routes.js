const db = require("../models");

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
        let lookupValue = req.body.name.toLowerCase();

        db.Beer.findAll({
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