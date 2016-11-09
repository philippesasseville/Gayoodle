var mongoose = require('mongoose');
var Question = mongoose.model('Question');


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QuizFacile', path: req.path });
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard', { title: 'QuizFacile',  path: req.path });
});

router.get('/rules', function(req, res) {
  res.render('rules', { title: 'QuizFacile', path: req.path  });
});

router.get('/exam', function(req, res) {
  res.render('exam', { title: 'QuizFacile', path: req.path  });
});

router.get('/results', function(req, res) {
  res.render('results', { title: 'QuizFacile', path: req.path });
});

router.get('/users', function(req, res) {
  res.render('users', { title: 'QuizFacile', path: req.path });
});

router.get('/ajouterQuestion', function(req, res) {
  res.render('addQuestion', { title: 'Ajouter une Question', path: req.path });
});


router.get('/quicktest', function(req, res) {
  res.render('quicktest', { 
    path: req.path, 
    note: '0%',
    index: '1'
  });
});


router.create = function ( req, res ){
	console.log(req.body.reponse);
	var slot1 =false;
	var slot2 =false;
	var slot3 =false;
	
	console.log(req.body.reponse.localeCompare("reponse1"));
	
	//local compare returns 0 on perfect match
	if (!req.body.reponse.localeCompare("reponse1"))
		slot1 = true
	
	if (!req.body.reponse.localeCompare("reponse2"))
		slot2 = true
	
	if (!req.body.reponse.localeCompare("reponse3"))
		slot3 = true
	
  new Question({
	 theme: req.body.theme,
	 question: req.body.question,
	 reponses: [{text:req.body.reponse1, ans: slot1 },
	 {text:req.body.reponse2, ans: slot2 },
	 {text:req.body.reponse3, ans: slot3 }]
	}).save( function( err, question, count ){
    res.redirect( '/ajouterQuestion' );
  });
};

router.index = function( req, res ){
  var filter = {};
  var fields = {};
  var options = {limit: 1};

  Question.findRandom(filter, fields, options, function(err, results) {
    var questions = JSON.stringify(results[0]);
    res.send(questions);

  });
};

router.theme = function( req, res ){
  var theme = req.params.theme.substr(1);

  var filter = {theme: theme};
  var fields = {};
  var options = {limit: 1};

  Question.findRandom(filter, fields, options, function(err, results) {
    var questions = JSON.stringify(results[0]);
    res.send(questions);
  });
};

router.updateQuickTest = function( req, res ){
  //TODO
  console.log(req.body.answer_of_life);
  res.send("sucess");
};

module.exports = router;
