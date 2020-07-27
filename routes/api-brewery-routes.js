const db = require("../models");
const { Op } = require("sequelize");

module.exports = function (app) {
    app.post("/api/brewery", (req, res) => {
        db.Brewery.create({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state
        }).then(() => {
            res.redirect(307, "/user");
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
                state: sequelize.where(sequelize.fn('LOWER', sequelize.col('state')), 'LIKE', '%' + req.query.state.toLowerCase() + '%'),
                id: sequelize.where(sequelize.fn('LOWER', sequelize.col('id')), 'LIKE', '%' + req.query.id.toLowerCase() + '%')
            }
        }).then((dbPost) => {
            res.json(dbPost);
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.get("/api/brewery/favorite/:userId", (req, res) => {
        db.User.findAll({
            include: db.Brewery,
            where: {
                userId: parseInt(req.params.userId)
            }
        }).then((dbPost) => {
            let breweryArr = [];
          const dbBreweries = dbPost[0].Breweries;
            for (let i = 0; i < dbBreweries.length; i++) {
                let breweryObj = {
                    id: dbBreweries[i].id,
                    name: dbBreweries[i].name,
                    state: dbBreweries[i].state,
                    city: dbBreweries[i].city
                }
                breweryArr.push(breweryObj);
            } 
           res.json(breweryArr)
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.delete("/api/brewery/favorite/:uid/:bid", (req, res) => {
        db.UserFavBrewery.destroy({
            where: {
                [Op.and]: [
                    { UserUserId: req.params.uid },
                    { BreweryId: req.params.bid }
                ]
            }
        }).then((result) => {
            res.render("user");
        }).catch(err => {
            console.log(err);
            res.status(401).json(err);
        });
    });

    app.post("/api/brewery/favorite", (req, res) => {
        db.UserFavBrewery.create(req.body).then((result) => {
            res.status(200);
        }).catch(err => {
            res.status(401).json(err);
        });
    });
}