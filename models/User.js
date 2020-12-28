const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);

//Note: The .model() function makes a copy of schema. Make sure that you've added everything 
// you want to schema, including hooks, before calling .model()!
//   To use our schema definition, we need to convert our Schema into a Model we can work with. 
// To do so, we pass it into mongoose.model(modelName, schema):