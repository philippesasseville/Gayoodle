var express = require('express');
var router = express.Router();

router.get('/q1', function(req, res, next) {
  //TODO: GET FROM FILE
  res.json(q[0]);
});

router.get('/randomQuestion', function(req, res, next) {
  //TODO: GET FROM FILE
  res.json(q[random(0,2)]);
});

var random = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}   

module.exports = router;


var q = [
  {
      question: 'Que veux dire WWW?',
      rep1: {text:'Weird Wizard Words', ans: false },
      rep2: {text:'World Wide Web',  ans: true },
      rep3: {text:'Wild Wank Weiner',  ans: false }
  },
  {
      question: 'Ou devrais etre le style de ma page web?',
      rep1: {text:'Dans un fichier css', ans: true },
      rep2: {text:'Dans une belle mallette mauve',  ans: false },
      rep3: {text:'Une page web n\'a pas de style',  ans: false }
  },
  {
      question: 'Que veux dire la balise br?',
      rep1: {text:'Retour a la ligne', ans: true },
      rep2: {text:'Le serveur est au Bresil',  ans: false },
      rep3: {text:'Bonnie Rotten',  ans: false }
  }
];
