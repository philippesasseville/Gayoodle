var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/randomQuestionTheme/:theme', function(req, res, next) {
  
  fs.readFile('./public/data/questions.json', 'utf8', function (err,data) {
    var json = JSON.parse(data);
    var curatedjson= {"questions" : []};
    for(var i = 0; i < json.questions.length; i++){
		if(json.questions[i].theme == req.params.theme.substr(1))
			curatedjson.questions.push(json.questions[i]);
	}
    if (err) {
      return console.log(err);
    }
    res.json(curatedjson.questions[random(0,curatedjson.questions.length)]);
  });
});

router.get('/randomQuestion', function(req, res, next) {
  
  fs.readFile('./public/data/questions.json', 'utf8', function (err,data) {
    var json = JSON.parse(data);
    if (err) {
      return console.log(err);
    }
    res.json(json.questions[random(0,json.questions.length)]);
  });
});

var random = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}   

module.exports = router;
