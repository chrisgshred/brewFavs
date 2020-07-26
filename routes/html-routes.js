// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

    app.get("/user", (req, res) => {
        // you have to make a call to your database to grab the data and then render it to the page

        const userData = [{
            email: "",
            brews: "",
            breweries: ""
        }]
        const storeData = [{
                name: "",
                city: "",
                state: ""
            },
            {
                name: "",
                city: "",
                state: ""
            }
        ]
        const beerData = [{
                name: "",
                style: "",
                ounces: ""
            },
            {
                name: "",
                style: "",
                ounces: ""
            }
        ]

        const hdlbrsObject = {
            locationData: storeData,
            productData: beerData,
            userDetails: userData,
        }
        res.render("user", hdlbrsObject);
    });


    app.get("/search", (req, res) => {
        // search results are rendered client side for this search view
        res.render("search");
    });

    app.get("/add", (req, res) => {
        res.render("add");
    });
};