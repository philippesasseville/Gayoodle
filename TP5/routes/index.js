var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var QuickTestStats = mongoose.model('QuickTestStats');
var ExamStats = mongoose.model('ExamStats');
var Exam = mongoose.model('Exam');

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

router.getExams = function( req, res ){
  var filter = {};
  var fields = {};
  var options = {limit: 10};
  Exam.find(filter, fields, options, function(err, results) {
    res.send(results);
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

router.compileExamResult = function(req, res){
  ExamStats.find(function(err, results){
    results = results[0];
    if(parseFloat(req.body.pourcentage) > 50.00)
    {
      if(!req.body.theme.localeCompare("HTML"))
      {
        results.HTMLwin = results.HTMLwin + 1;
      }
      else if(!req.body.theme.localeCompare("CSS"))
      {
        results.CSSwin = results.CSSwin + 1;
      }
      else
      {
        results.JSwin = results.JSwin + 1;
      }
    }
    else
    {
      if(!req.body.theme.localeCompare("HTML"))
      {
        results.HTMLloss = results.HTMLloss + 1;
      }
      else if(!req.body.theme.localeCompare("CSS"))
      {
        results.CSSloss = results.CSSloss + 1;
      }
      else
      {
        results.JSloss = results.JSloss + 1;
      }
    }
    results.examMoyenne = ((req.body.pourcentage + results.examMoyenne) / (results.HTMLwin + results.HTMLloss + results.CSSwin + results.CSSloss + results.JSwin + results.JSloss)).toFixed(0);
    results.save(function(err,examstats){
      if(err)
        console.log(err);
    });

    new Exam(req.body).save(function(err, exam){
      if(err)
        console.log(err);
    });

  });

  /*.save(function(err, examstats){
    console.log("lamo");
  });
*/
  res.status(200).send(true);
};

router.getQuickTestStats = function(req, res) {
  QuickTestStats.find(function ( err, stats, count ){
    res.send(stats[0]);
  });
};

router.getExamStats = function(req, res) {
  ExamStats.find(function ( err, stats, count ){
    res.send(stats[0]);
  });
};

router.clearExamStats = function(req, res) {
  var examDone = false;
  var quickDone = false;
  ExamStats.find(function ( err, stats, count ){
    stats[0].HTMLwin = 0;
    stats[0].HTMLloss = 0;
    stats[0].CSSwin = 0;
    stats[0].CSSloss = 0;
    stats[0].JSwin = 0;
    stats[0].JSloss = 0;
    stats[0].examMoyenne = 0;
    stats[0].save(function(err, stats) {
      res.send(true);
    })
  });
};

router.clearQuickTestStats = function(req, res) {
  QuickTestStats.find(function ( err, stats, count ){
    stats[0].questionsRapidesWin = 0;
    stats[0].questionsRapidesLoss = 0;
    stats[0].questionsRapidesMoy = 0;
    stats[0].save(function(err, stats) {
      res.send(true);
    })
  });
};

router.dropExams = function(req,res){
  Exam.remove({}, function(err) { 
   console.log('collection removed') 
  });
  res.status(200).send(true);
};

module.exports = router;
