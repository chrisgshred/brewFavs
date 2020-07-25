const db = require("../models");
const { Op } = require("sequelize");

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
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.body.name.toLowerCase() + '%'),
                city: sequelize.where(sequelize.fn('LOWER', sequelize.col('city')), 'LIKE', '%' + req.body.city.toLowerCase() + '%'),
                state: sequelize.where(sequelize.fn('LOWER', sequelize.col('state')), 'LIKE', '%' + req.body.state.toLowerCase() + '%')
            }
        }).then((dbPost) => {
            console.log(dbPost);
            res.json(dbPost);
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.get("/api/brewery/favorite/:userId", (req, res) => {

        db.UserFavBrewery.findAll({
            include: [db.User, db.Brewery],
            where: {
                userId: parseInt(req.params.userId)
            }
        }).then((dbPost) => {

            let breweryArr = [];
            for (let index = 0; index < dbPost.length; index++) {

                const dbBreweries = dbPost[index].Brewery;

                let breweryObj = {
                    name: dbBreweries.name,
                    state: dbBreweries.state,
                    city: dbBreweries.city
                }
                breweryArr.push(breweryObj)

            }

            const responseObj = {
                user: dbPost[0].User.email,
                breweries: breweryArr
            }

            console.log(responseObj)
            res.redirect(307, "/profile");
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.delete("/api/brewery/favorite/:uid/:bid", (req, res) => {
        db.UserFavBrewery.destroy({
            where: {
                [Op.and]: [
                    { userId: req.params.uid },
                    { breweryId: req.params.bid }
                ]
            }
        }).then((result) => {
            console.log(result);
            res.redirect(307, "/profile");
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.post("/api/brewery/favorite", (req, res) => {
        db.UserFavBrewery.create(req.body).then((result) => {
            console.log(result);
            res.redirect(307, "/profile");
        }).catch(err => {
            res.status(401).json(err);
        });
    });
}