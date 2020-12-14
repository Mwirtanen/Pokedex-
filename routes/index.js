const router = require("express").Router(),
    routes = require("./routes");

router.use("/", routes);
router.use("/register", routes);
router.use("/user", routes);  

module.exports = router;