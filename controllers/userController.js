const User = require("../models.user");

const getUserParams = (body) => {
    return {
        username: body.username,
        email: body.email,
        password: body.password,
        pokemons: body.pokemons
    }
};

module.exports = {

    register: (req, res) => {
        res.render("/reqister");
    },

    create: (req, res, next) => {
        let userParams = getUserParams(req.body);
        User.create(userParams)
        .then(user => {
            res.locals.redirect = "/index";
            req.flash("success", `${user.first}'s account created successfully!`);
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error saving user: ${error.message}`);
            res.locals.redirect = "/register";
            req.flash(
                "error", `Failed to create user account because: ${error.message}.`
            );
            next();
        });
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("/profile");
    },

    edit: (req, res, next) => {
        let userID = req.params.id;
        User.findById(userID)
        .then(user => {
            res.render("/edit", {user: user})
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });          
    },

    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = {
            username = req.body.name,
            email: req.body.email,
            password: req.body.password,
            pokemons: req.body.pokemons
        };

        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `/profile`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = `/index`;
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    }

};