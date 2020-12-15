const Pokemon = require('../models/pokemon')

var colors = { 
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
    Flying: ['#fff44f', '#f5f7fa', '#f5f7fa', '#c3cfe2', 'lightgrey'],
};

module.exports = {
    index: (req, res) => {
        res.render("index");
    },
    pokemon: (req, res) => {
        let index_array = [];
        let pokemons_from_to = req.query.pokemons;
        if(/-/.test(pokemons_from_to)) {
            pokemons_from_to = pokemons_from_to.split('-')
            res.locals.from_to = pokemons_from_to;
            for(let i = parseInt(pokemons_from_to[0]); i<= parseInt(pokemons_from_to[1]); i++){
            index_array.push(i);
        }
        } else if(/ /.test(pokemons_from_to)) {
            pokemons_from_to = pokemons_from_to.split(' ');
            res.locals.from_to = [1, 2];
            pokemons_from_to.forEach(x => {
                index_array.push(parseInt(x));
            });
            console.log(index_array)
        }
        Pokemon.find().where('pokemon_index').in(index_array).exec((err, records) => {
            console.log(records)
            res.render("pokemons", {pokemons: records, colors: colors});
        });
    },
    pokemons: (req, res, next) => {
        Pokemon.find({})
        .then(pokemons => {
            res.locals.pokemons = pokemons;
            next();
        })
        .catch(error => {
            console.log(`${error.message}`);
            next(error);
        });
    },
    pokemonView: (req, res) => {
        res.json(res.locals.pokemons);
    }
};