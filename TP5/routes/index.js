var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/templates/:template', function(req, res, next) {
    res.render('templates/' + req.params.template + ".pug");
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

module.exports = router;
