const mongoose = require('mongoose'),
    { Schema } = mongoose,

pokemonSchema = new Schema({
    pokemon_index:{
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    type: {
        type: [String],
        required: true,
        lowercase: true,
    },
    base: {
        hp:{
            type: Number,
            required: true,
        },
        attack:{
            type: Number,
            required: true
        },
        defence: {
            type: Number,
            required: true
        },
        sp_attack: {
            type: Number
        },
        sp_defence: {
            type: Number
        },
        speed: {
            type: Number,
        }
    },
},
    { timestamps: true });

module.exports = mongoose.model('Pokemon', pokemonSchema);