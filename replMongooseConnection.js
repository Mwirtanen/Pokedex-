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