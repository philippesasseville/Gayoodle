var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Questions = new Schema({
 "theme": String,
 "id" : Number,
 "question":String,
 "reponses": [{"text":String, "ans": Boolean }]
});

mongoose.model( 'Questions', Questions );
mongoose.connect( 'mongodb://maymay:topkek@ds147797.mlab.com:47797/db_log4420' );