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
  console.log("SERVER : " + JSON.stringify(req.body));
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

  console.log("saving : ");
  var q = new Question({
   theme: req.body.theme,
   question: req.body.question,
   reponses: [{text:req.body.reponses[0].text, ans: req.body.reponses[0].ans },
   {text:req.body.reponses[1].text, ans: req.body.reponses[1].ans },
   {text:req.body.reponses[2].text, ans: req.body.reponses[2].ans }]
  });

  console.log(JSON.stringify(q));

  q.save( function( err, question, count ){
    console.log("saved");
    res.status(200);
  });
};

module.exports = router;
