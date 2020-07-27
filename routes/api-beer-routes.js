const db = require("../models");
sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = function (app) {
    app.post("/api/beer", (req, res) => {
        db.Beer.create({
            name: req.body.name,
            style: req.body.style,
            ounces: req.body.ounces
        }).then(() => {
            res.redirect(307, "/user");
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
            jsonDb = dbPost.map(post => post.toJSON());
            res.json(jsonDb);
        }).catch(err => {
            res.status(401).json(err);
        });

    });

    app.get("/api/beer/favorite/:userId", (req, res) => {
        db.User.findAll({
            include: db.Beer,
            where: {
                userId: parseInt(req.params.userId)
            }
        }).then((dbPost) => {
           
           
            let beerArr = [];
            const dbBeers = dbPost[0].Beers;
            for (let i = 0; i < dbBeers.length; i++) {
                let beerObj = {
                    id: dbBeers[i].id,
                    name: dbBeers[i].name,
                    style: dbBeers[i].style,
                    ounces: dbBeers[i].ounces
                }
                beerArr.push(beerObj);
            } 
           res.json(beerArr)
        }).catch(err => {
            res.status(401).json(err);
        });
    });



    app.post("/api/beer/favorite", (req, res) => {
        db.UserFavBeer.create(req.body).then((result) => {
            res.status(200);
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.delete("/api/beer/favorite/:uid/:bid", (req, res) => {
        db.UserFavBeer.destroy({
            where: {
                [Op.and]: [
                    { UserUserId: req.params.uid },
                    { BeerId: req.params.bid }
                ]
            }
        }).then((result) => {
           res.render("user");
        }).catch(err => {
            console.log(err);
            res.status(401).json(err);
        });
    });
}