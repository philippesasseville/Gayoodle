var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/randomQuestion', function(req, res, next) {
  
  fs.readFile('./public/data/questions.json', 'utf8', function (err,data) {
    var json = JSON.parse(data);
    if (err) {
      return console.log(err);
    }
    res.json(json.questions[random(0,12)]);
  });
});

var random = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}   

module.exports = router;