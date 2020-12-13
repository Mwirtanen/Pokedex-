const mongoose = require("mongoose"),
passportLocalMongoose = require('passport-local-mongoose'),
{ Schema } = mongoose;


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
    pokemons: [{type: Schema.Types.ObjectId, ref: 'Pokemon'}]
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model("User", userSchema);

