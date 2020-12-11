const mongoose = require("mongoose");

userSchema = mongoose.Schema({

    username:{ 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    pokemons: {
        type: Array
    }
});

module.exports = mongoose.model("User", userSchema);

