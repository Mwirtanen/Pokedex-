const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
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
app.use(express.static('public'));
app.set("view engine", "ejs");

app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/", homeController.index);

router.get("/", homeController.index);

router.get("/register", userController.register);
router.get("/login", userController.login);
router.get("/logout", userController.logout, userController.redirectView);
router.post("/login", userController.authenticate);


router.post("/register/create", userController.create, userController.redirectView);
//app.post("/create", userController.create, userController.redirectView);
app.get("/:username/edit", userController.edit);
//app.put("/:username/update", userController.update, userController.redirectView);
app.get("/:username", userController.show, userController.showView);

app.listen(app.get("port"), () => {
    console.log(`Server running listening to port ${app.get("port")}`);
});