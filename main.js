const express = require("express"),
    app = express(),
    router = require('./routes/index'),
    mongoose = require("mongoose"),
    layouts = require("express-ejs-layouts"),
    User = require('./models/user'),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    pokemons = require('./pokemon'),
    userController = require('./controllers/userController'),
    homeController = require("./controllers/homeController");

mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://localhost:27017/pokemon_db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose.');
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);

app.use(express.static('public'));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(expressValidator());

app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));
app.use(cookieParser('secret_passcode'));
app.use(expressSession({
    secret: 'secret_passcode',
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', router);

app.listen(app.get("port"), () => {
    console.log(`Server running listening to port ${app.get("port")}`);
});