module.exports = {
    index: (req, res) => {
        res.render("index");
    },
    pokemon: (req, res) => {
        res.render("pokemons");
    }
};