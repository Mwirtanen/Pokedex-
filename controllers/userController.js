const User = require("../models/user"),
    Pokemon = require('../models/pokemon'),
    passport = require("passport");

const getUserParams = (body) => {
    return {
        username: body.username,
        email: body.email,
        password: body.password,
        pokemons: body.pokemons
    };
},

    _colors = {
        Electric: ['#fff44f', 'rgb(203,213,72)', 'rgba(203,213,72,1)', 'rgba(242,255,0,0.56)', '#ffff94'],
        Fire: ['#fff44f', '#f9484a', '#fbd72b', '#f9484a', '#ff7f50'],
        Grass: ['#fff44f', '#3cb371', '#9be15d', '#96e6a1', '#90ee90'],
        Bug: ['#fff44f', '#38f9d7', '#43e97b', '#96e6a1', '#90ee90'],
        Water: ['#fff44f', '#4facfe', '#4facfe', '#00f2fe', '#73c2fb'],
        Normal: ['#fff44f', '#f5f7fa', '#f5f7fa', '#c3cfe2', 'lightgrey'],
        Steel: ['#fff44f', '#f5f7fa', '#f5f7fa', '#c3cfe2', 'lightgrey'],
        Dragon: ['#fff44f', '#f5f7fa', '#f5f7fa', '#c3cfe2', 'lightgrey'],
        Fairy: ['#fff44f', '#f5f7fa', '#f5f7fa', '#c3cfe2', 'lightgrey'],
        Poison: ['#fff44f', '#c471f5', '#c471f5', '#fa71cd', '#dda0dd'],
        Psychic: ['#fff44f', '#c471f5', '#c471f5', '#fa71cd', '#dda0dd'],
        Ice: ['#fff44f', '#c471f5', '#c471f5', '#fa71cd', '#dda0dd'],
        Fight: ['#fff44f', '#c79081', '#c79081', '#dfa579', '#ffe5b4'],
        Fighting: ['#fff44f', '#c79081', '#c79081', '#dfa579', '#ffe5b4'],
        Rock: ['#fff44f', '#fdfcfb', '#fdfcfb', '#e2d1c3', '#ffefd5'],
        Ground: ['#fff44f', '#fdfcfb', '#fdfcfb', '#e2d1c3', '#ffefd5'],
        Ghost: ['#fff44f', '#c471f5', '#c471f5', '#fa71cd', '#dda0dd'],
        Dark: ['#fff44f', '#c471f5', '#c471f5', '#fa71cd', '#dda0dd'],
        Flying: ['#fff44f', '#f5f7fa', '#f5f7fa', '#c3cfe2', 'lightgrey']
    }

module.exports = {
    addPokemon: (req, res, next) => {
        var pokemon;
        var user;
        Pokemon.findById(req.params.id)
            .then(res => {
                pokemon = res
            })
            .catch(e => {
                console.log(e);
                next(e);
            })
            .then(() => {
                User.findById(req.params.user_id)
                    .then(res => {
                        user = res;
                    })
                    .catch(e => {
                        console.log(e);
                        next(e);
                    })
                    .finally(() => {
                        user.pokemons.push(pokemon)
                        user.save()
                        req.flash('success', 'Pokemon added successfully to your collection.')
                        res.locals.redirect = `/profile/${user._id}`;
                        next()
                    })
            })
    },
    register: (req, res) => {
        res.render("register");
    },
    login: (req, res) => {
        res.render("login")
    },
    authenticate: passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Failed to login',
        successFlash: 'Logged in.',
        successRedirect: '/'
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash('success', 'You have been logged out!');
        res.locals.redirect = '/'
        next()
    },
    create: (req, res, next) => {
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash('success', `${user.username}'s account created successfully!`);
                res.locals.redirect = '/';
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
        var _pokemons;
        var _user;
        User.findById(req.params.id).then(document => {
            _user = document;
        }).catch(e => {
            console.log(e)
        }).then(async () => {
            await User.populate(_user, 'pokemons').then(user => {
                _pokemons = user.pokemons;
                console.log(_pokemons)
            }).catch(e => {
                console.log(e)
            })
        }).then(() => {
            res.render("profile", { pokemons: _pokemons, user: _user, colors: _colors });
        }).catch(e => {
            console.log(e)
        })
    },

    edit: (req, res) => {
        res.render("edit")
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
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }

};