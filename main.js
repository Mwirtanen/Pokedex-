const express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    homeController = require("./controllers/homeController");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(app.get("port"), () => {
    console.log(`Server running listening to port ${app.get("port")}`);
});