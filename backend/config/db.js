// connect mongoose to the db

const mongoose = require('mongoose');

let connectionString = `mongodb+srv://yianlsaechao:${process.env.MONGO_PASS}@recipes.6kdub4g.mongodb.net/Recipes?retryWrites=true&w=majority`


console.log(connectionString);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// log when connected

mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});