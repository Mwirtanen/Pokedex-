const User = require("../models/user"),
    passport = require('passport');

const getUserParams = (body) => {
    return {
        username: body.username,
        email: body.email,
        password: body.password,
        pokemons: body.pokemons
    };
};

module.exports = {

    register: (req, res) => {
        res.render("register");
    },

    create: (req, res, next) => {
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash('success', `${user.fullName}'s account created successfully!`);
                res.locals.redirect = '/index';
                next();
            } else {
                req.flash('error', `Failed to create user account because: ${error}`);
                res.locals.redirect = '/register';
                next();
            }
        })
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
        res.render("profile");
    },

    edit: (req, res, next) => {
        let userID = req.params.id;
        User.findById(userID)
            .then(user => {
                res.render("edit", { user: user })
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            pokemons: req.body.pokemons
        };

        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `profile`;
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
                res.locals.redirect = `index`;
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }

};