var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var QuickTestStats = mongoose.model('QuickTestStats');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/templates/:template', function(req, res, next) {
    res.render('templates/' + req.params.template + ".pug");
});

router.postQuestion = function ( req, res ){

  if (req.body.ans == -1){
    res.status(400);
    return;
  }

  if(req.body.theme ==  ""){
    res.status(400);
    return;
  }

  if(req.body.question ==  ""){
    res.status(400);
    return;
  }

  if(req.body.reponses[0].text ==  "" || req.body.reponses[1].text == "" || req.body.reponses[2].text == ""){
    res.status(400);
  }

  new Question(req.body)
  .save( function( err, question, count ){
    res.status(200);
  });
};

router.getRandomQuestion = function( req, res ){
  var filter = {};
  var fields = {};
  var options = {limit: 1};

  Question.findRandom(filter, fields, options, function(err, results) {
    var question = JSON.stringify(results[0]);
    res.send(question);

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


router.verifyAnswer = function(req, res){
  var questionText = req.body.question;
  var reponseChoisi = req.body.reponseChoisi;

  QuickTestStats.find(function(err, results){
    Question.find({"question": questionText}, function(err, question){
      if(reponseChoisi == question[0].reponses[question[0].ans].text){
        results[0].questionsRapidesWin = results[0].questionsRapidesWin + 1;
        res.status(200).send(true);
      }
      else
      {
        results[0].questionsRapidesLoss =  results[0].questionsRapidesLoss + 1;
        res.status(200).send(false);
      }

      results[0].questionsRapidesMoy = (( results[0].questionsRapidesWin / ( results[0].questionsRapidesWin +  results[0].questionsRapidesLoss))*100).toFixed(0);
      results[0].save(function( err, stats, count ){
        console.log(JSON.stringify(stats));
      });
    });
  });
};

router.verifyAnswerExam = function(req, res){
  var questionText = req.body.question;
  var reponseChoisi = req.body.reponseChoisi;

  Question.find({"question": questionText}, function(err, question){
    if(reponseChoisi == question[0].reponses[question[0].ans].text){
      res.status(200).send(true);
    }
    else
    {
      res.status(200).send(false);
    }
  });
};

module.exports = router;
