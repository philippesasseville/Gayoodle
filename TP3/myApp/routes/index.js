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

router.get('/quicktest', function(req, res) {
  res.render('quicktest', { 
    path: req.path, 
    note: '0%',
    index: '1'
  });
});

// function httpGet(theUrl)
// {
//   console.log('HTTPGET');
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }



module.exports = router;
