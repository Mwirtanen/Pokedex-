const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    layouts = require("express-ejs-layouts"),
    router = express.Router(),
    User = require('./models/user'),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    pokemons = require('./pokemon'),
    homeController = require("./controllers/homeController"),
    userController = require("./controllers/userController");

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

router.use(express.static('public'));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());
router.use(expressValidator());

router.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));
router.use(cookieParser('secret_passcode'));
router.use(expressSession({
    secret: 'secret_passcode',
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', router);

router.get("/", (req, res) => {
    res.render("index");
});


router.get("/", homeController.index);

router.get("/register", userController.register);
router.get("/login", userController.login);
router.post("/login", userController.authenticate);


router.post("/register/create", userController.create, userController.redirectView);
//app.post("/create", userController.create, userController.redirectView);
router.get("/:username/edit", userController.edit);
//app.put("/:username/update", userController.update, userController.redirectView);
router.get("/:username", userController.show, userController.showView);

app.listen(app.get("port"), () => {
    console.log(`Server running listening to port ${app.get("port")}`);
});