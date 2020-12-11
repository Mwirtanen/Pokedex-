const mongoose = require('mongoose'),
    Pokemon = require('./models/pokemon'),
    pokemons = require('./pokemon');

mongoose.connect(
    'mongodb://localhost:27017/pokemon_db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

mongoose.connection;

var commands = []

Pokemon.deleteMany()
    .exec()
    .then(() => {
        console.log('All the pokemons are gone!')
    });

pokemons.pokemons.forEach(p => {
    commands.push(
        Pokemon.create({
            name: p.name.english,
            type: p.type,
            base: {
                hp: p.base.HP,
                attack: p.base.Attack | null,
                defence: p.base.Defence | null,
                sp_attack: p.base["Sp. Attack"] | null,
                sp_defence: p.base["Sp. Defence"] | null,
                speed: p.base.speed | null
            }
        }));
})

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    })
