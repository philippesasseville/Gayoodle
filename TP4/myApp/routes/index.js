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
	
  new Questions({
	 theme: req.body.theme,
	 id : req.body.id,
	 question: req.body.question,
	 reponses: [{text:req.body.reponse1, ans: slot1 },
	 {text:req.body.reponse2, ans: slot2 },
	 {text:req.body.reponse3, ans: slot3 }]
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
