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


router.post('/postQuestion', function(req, res) {
  var stuff = req.body.content;
  console.log("CONTENT: " + stuff);

  new Model({
    theme    : "test",
    id : 999
  }).save( function( err, todo, count ){
      console.log("SAVE");
    res.redirect( '/addQuestion' );
  });
});//router.create);



// exports.create = function ( req, res ){
//   new Model({
//     theme    : "test",
//     id : 999
//   }).save( function( err, todo, count ){
//     res.redirect( '/ajouterQuestion' );
//   });
// };


module.exports = router;
