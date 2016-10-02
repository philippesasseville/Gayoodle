var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QuizFacile', path: req.path });
});

router.get('/game', function(req, res) {
  res.render('game', { title: 'QuizFacile',  path: req.path });
});

router.get('/rules', function(req, res) {
  res.render('rules', { title: 'QuizFacile', path: req.path  });
});

router.get('/quicktest-q1', function(req, res) {
  res.render('quicktest', { 
  	title: 'Question 1', 
  	path: req.path, 
  	quiz: q1,
  	next: 'quicktest-q2'
  });
});

router.get('/quicktest-q2', function(req, res) {
  res.render('quicktest', { 
  	title: 'Question 2', 
  	path: req.path, 
  	quiz: q2,
  	next: 'quicktest-q3'
  });
});

router.get('/quicktest-q3', function(req, res) {
  res.render('quicktest', { 
  	title: 'Question 3', 
  	path: req.path, 
  	quiz: q3,
  	next: 'game'
  });
});

var q1 = {
	question: 'Que veux dire WWW?',
  	rep1: {text:'Weird Wizard Words', ans: false },
  	rep2: {text:'World Wide Web',  ans: true },
  	rep3: {text:'Wild Wank Weiner',  ans: false }
}

var q2 = {
	question: 'Ou devrais etre le style de ma page web?',
  	rep1: {text:'Dans un fichier css', ans: true },
  	rep2: {text:'Dans une belle mallette mauve',  ans: false },
  	rep3: {text:'Une page web n\'a pas de style',  ans: false }
}

var q3 = {
	question: 'Que veux dire la balise br?',
  	rep1: {text:'Retour a la ligne', ans: true },
  	rep2: {text:'Le serveur est au Bresil',  ans: false },
  	rep3: {text:'Bonnie Rotten',  ans: false }
}



module.exports = router;
