// in it will do mongodb connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
//mongoose.set('useUnifiedTopology', true);


const connectDB = async () => {
    try {
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, 
            useFindAndModify: false, findOneAndUpdate: false, findOneAndDelete: false
         });
        //since mongoose.connect return a promise thats why we need to use async await
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        //Exit process with Failure
        process.exit(1);
    }
}

module.exports = connectDB;