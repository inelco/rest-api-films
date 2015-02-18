var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    name : String,
    year : Number,
    rating : Number
});

var movie = mongoose.model('movie', movieSchema);
module.exports = movie;