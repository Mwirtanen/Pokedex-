const { use } = require(".");
const user = require("../models/user");

const router = require("express").Router(),
    homeController = require("../controllers/homeController"),
    userController = require("../controllers/userController");

router.get("/", (req, res) => {
    res.render("index");
});
    
    
router.get("/", homeController.index);
router.get("/pokemons", homeController.pokemon);
    
router.get("/register", userController.register);
router.get("/login", userController.login);
  
router.get("/logout", userController.logout, userController.redirectView);
router.post("/user/login", userController.authenticate);
router.put("/user/:user_id/pokemon/:id", userController.addPokemon, userController.redirectView);
    
router.post("/register/create", userController.create, userController.redirectView);
router.get("/profile", userController.showView);

router.get("/edit", userController.edit);
router.put("/:id/update", userController.update, userController.redirectView);
router.delete("/:id/delete", userController.delete, userController.redirectView);


module.exports = router;