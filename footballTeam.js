const mongoose = require('mongoose')
const { Schema } = mongoose;

const teamSchema = new Schema({
        year: Number,
        brand: String,
        stadium: String,
        colors: Array,
        GoalsPerMatch: Number,
        EuropeanTeam: Boolean
    })
    //defining the name of the constructor for our class
const FootballTeam = mongoose.model('FootballTeam', teamSchema);
//export the class, also called a model or a document, to use in different files
module.exports = FootballTeam