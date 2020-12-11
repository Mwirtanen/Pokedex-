const Pokemon = require('../models/pokemon')

module.exports = {
    index: (req, res) => {
        res.render("index");
    },
    pokemon: (req, res) => {
        let index_array = [];
        let pokemons_from_to = req.query.pokemons;
        pokemons_from_to = pokemons_from_to.split('-')
        for(let i = pokemons_from_to[0]; i<= pokemons_from_to[1]; i++){
            index_array.push(i);
        }
        Pokemon.find().where('pokemon_index').in(index_array).exec((err, records) => {
            res.render("pokemons", {pokemons: records});
        });
    }
};