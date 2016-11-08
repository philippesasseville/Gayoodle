var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var random = require('mongoose-simple-random');

var Question = new Schema({
 theme: String,
 question:String,
 reponses: [{text:String, ans: Boolean }]
});
Question.plugin(random);
mongoose.model( 'Question', Question );
mongoose.connect( 'mongodb://maymay:topkek@ds147797.mlab.com:47797/db_log4420' );