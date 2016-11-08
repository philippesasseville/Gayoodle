var mongoose = require('mongoose');
var Questions = mongoose.model('Questions');
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
	console.log("hello");
  new Questions({
	 theme: "HTML",
	 id : "1234",
	 question: req.body.question,
	 reponses: [{text:req.body.reponse1, ans: true },
	 {text:req.body.reponse2, ans: false },
	 {text:req.body.reponse3, ans: false }]
	}).save( function( err, comment, count ){
    res.redirect( '/ajouterQuestion' );
  });
};



// exports.create = function ( req, res ){
//   new Model({
//     theme    : "test",
//     id : 999
//   }).save( function( err, todo, count ){
//     res.redirect( '/ajouterQuestion' );
//   });
// };


module.exports = router;
