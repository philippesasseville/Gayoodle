var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/templates/:template', function(req, res, next) {
    res.render('templates/' + req.params.template + ".pug");
});

router.postQuestion = function ( req, res ){
  var slot1 =req.body.reponses[0].ans;
  var slot2 =req.body.reponses[1].ans;
  var slot3 =req.body.reponses[2].ans;

  if (!slot1 && !slot2 && !slot3){
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

module.exports = router;
