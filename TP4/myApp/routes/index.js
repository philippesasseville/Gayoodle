var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var QuickTestStats = mongoose.model('QuickTestStats');

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
  console.log(req.path);
  res.render('addQuestion', { title: 'Ajouter une Question', path: req.path });
});


router.get('/quicktest', function(req, res) {
  res.render('quicktest', { 
    path: req.path, 
    note: '0%',
    index: '1'
  });
});


router.postQuestion = function ( req, res ){
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
	
  if (!slot1 && !slot2 && !slot3){
    res.status(400).render('addQuestion', {path: '/ajouterQuestion',message: "at least one answer must be true"});
    return;
  }

  if(req.body.theme ==  ""){
    res.status(400).render('addQuestion', {path: '/ajouterQuestion',message: "question must have a theme"});
    return;
  }

  if(req.body.question ==  ""){
    res.status(400).render('addQuestion', {path: '/ajouterQuestion', message: "must have a question"});
    return;
  }

  if(req.body.reponse1 ==  "" || req.body.reponse2 == "" || req.body.reponse3 == ""){
    res.status(400).render('addQuestion', {path: '/ajouterQuestion',message: "question must have 3 answer options"});
    return;
  }

  new Question({
	 theme: req.body.theme,
	 question: req.body.question,
	 reponses: [{text:req.body.reponse1, ans: slot1 },
	 {text:req.body.reponse2, ans: slot2 },
	 {text:req.body.reponse3, ans: slot3 }]
	}).save( function( err, question, count ){
    res.status(200).render('addQuestion',{path: '/ajouterQuestion',message: "Question ajoutee avec success!"});
  });
};

router.getRandomQuestion = function( req, res ){
  var filter = {};
  var fields = {};
  var options = {limit: 1};

  Question.findRandom(filter, fields, options, function(err, results) {
    var questions = JSON.stringify(results[0]);
    res.send(questions);

  });
};

router.getRandomQuestionTheme = function( req, res ){
  var theme = req.params.theme.substr(1);

  var filter = {theme: theme};
  var fields = {};
  var options = {limit: 1};

  Question.findRandom(filter, fields, options, function(err, results) {
    var questions = JSON.stringify(results[0]);
    res.send(questions);
  });
};

router.deleteQuestions = function(req, res) {
  console.log("DELETING SHIT?");
  Question.find(function ( err, todo ){
    Question.remove( function ( err, todo ){
      res.redirect( '/' );
    });
  });

};
/*router.putQuickTestStats = function( req, res ){
  
  var isResultOk = req.body.isResultOk;

  QuickTestStats.find({"_id": "58235d2ddcba0f326cc62b1d"},function(err, results){
    console.log(results);
    var stats = results[0];
    if(isResultOk)
      stats.questionsRapidesWin = stats.questionsRapidesWin + 1;
    else
      stats.questionsRapidesLoss = stats.questionsRapidesLoss + 1;

    stats.questionsRapidesMoy = ((stats.questionsRapidesWin / (stats.questionsRapidesWin + stats.questionsRapidesLoss))*100).toFixed(0);

    stats.save(function( err, stats, count ){
      //console.log("saved");
    });
  });

  res.send("sucess");
};*/

router.verifyAnswer = function(req, res){
  console.log(req.body);
  var id = req.body.question_id;
  var ans = req.body.ans;

  QuickTestStats.find({"_id": "58235d2ddcba0f326cc62b1d"},function(err, results){
    var stats = results[0];
    Question.find({"_id": id}, function(err, question){
      if(ans == question[0].reponses[question[0].ans].text){
        stats.questionsRapidesWin = stats.questionsRapidesWin + 1;
        res.status(200).send(true);
      }
      else
      {
        stats.questionsRapidesLoss = stats.questionsRapidesLoss + 1;
        res.status(200).send(false);
      }
      stats.questionsRapidesMoy = ((stats.questionsRapidesWin / (stats.questionsRapidesWin + stats.questionsRapidesLoss))*100).toFixed(0);
      stats.save(function( err, stats, count ){
        console.log(JSON.stringify(stats));
      });
    });
  });
};

router.verifyAnswerExam = function(req, res){
  console.log(req.body);
  var id = req.body.question_id;
  var ans = req.body.ans;

  Question.find({"_id": id}, function(err, question){
    if(ans == question[0].reponses[question[0].ans].text){
      res.status(200).send(true);
    }
    else
    {
      res.status(200).send(false);
    }
  });
};

module.exports = router;
