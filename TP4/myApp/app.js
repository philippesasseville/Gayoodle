var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var mongoose = require('mongoose');
var db = require('./lib/db.js');
// var Model = mongoose.model('Question');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/ajaxRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/', api);

app.post('/question', routes.postQuestion);
app.get('/question', routes.getRandomQuestion);
app.get('/question/:theme', routes.getRandomQuestionTheme);
app.put('/verify', routes.verifyAnswer);
app.post('/deleteQuestions', routes.deleteQuestions);
app.put('/verifyexam', routes.verifyAnswerExam);
app.put('/examstats', routes.compileExamResult);
app.get('/qtstats', routes.getQuickTestStats);
// app.put('/qtstats', routes.putQuickTestStats);
app.get('/examstats', routes.getExamStats);
app.get('/getNbQuestions/:theme', routes.getNbQuestions);
app.post('/clearStats', routes.clearStats);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log("oops");
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
