const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    pokemons = require('./pokemon')
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

app.use(layouts);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/", homeController.index);

app.get("/users/register", userController.register);
//app.post("/users/create", userController.create, userController.redirectView);
app.get("/users/:username/edit", userController.edit);
//app.put("/users/:username/update", userController.update, userController.redirectView);
app.get("/users/:username", userController.show, userController.showView);

app.listen(app.get("port"), () => {
    console.log(`Server running listening to port ${app.get("port")}`);
});