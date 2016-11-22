var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var random = require('mongoose-simple-random');

var Question = new Schema({
 theme: String,
 question:String,
 ans: Number,
 reponses: [{text:String}]
});

var ExamStats = new Schema({
	HTMLwin: Number,
	HTMLloss: Number,
	CSSwin: Number,
	CSSloss: Number,
	JSwin: Number,
	JSloss: Number,
	examMoyenne: Number
});

var QuickTestStats = new Schema({

	questionsRapidesWin: Number,
	questionsRapidesLoss: Number,
	questionsRapidesMoy: Number
});

var Testo = new Schema({
	testo1: Number,
	testo2: Number,
})

Question.plugin(random);

mongoose.model( 'Question', Question );
mongoose.model( 'ExamStats', ExamStats );
mongoose.model( 'QuickTestStats', QuickTestStats );
mongoose.model( 'Testo', Testo );
mongoose.connect( 'mongodb://maymay:topkek@ds147797.mlab.com:47797/db_log4420' );
// mongoose.connect( 'mongodb://user:password@ds143767.mlab.com:43767/questions' );