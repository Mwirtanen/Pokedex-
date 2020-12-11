const mongoose = require("mongoose"),
passportLocalMongoose = require('passport-local-mongoose');


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

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model("User", userSchema);

