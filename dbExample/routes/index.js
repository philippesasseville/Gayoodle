var express = require('express');
var router = express.Router();
var connection = require('../db/userdb.js');

var users = null;
connection.get(db => users = db.collection('Users'));

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log("Premier middleware");
    var test = "Mon test a marché";
    next();
});

router.get('/', (req, res, next) => {
    var myUsers = users.find().toArray
    console.log(myUsers);
    users.find().toArray((err, userDocs) => {
        console.log(userDocs);
        res.render('index', { title: 'Express', users: userDocs });
    });
});

router.post('/remove', (req, res) => {
    console.log("DELETE");
    users.remove();
    res.redirect('/')
});

router.post("/signup", (req, res) => {
    console.log("Nom d'utilisateur: " + req.body.nom);
    if (req.body.nom) {
        users.insertOne({"nom": req.body.nom}, (err, user) => {
            if (!err) {
                console.log("Les documents ont été insérés dans la BD");
            }
            req.session.user = user.ops[0];
            res.redirect('/dashboard');
        });
    } else {
        res.redirect("/");
    }
});

router.get("/login", (req, res) => {
    res.render('login');
});

router.post("/login", (req, res) => {
    console.log("Nom d'utilisateur: " + req.body.nom);
    users.findOne({"nom": req.body.nom}, (err, user) => {
        if (!user) {
            res.render('login', {error: "Nom d'utilisateur ou mot de passé invalide."});
        } else {
            req.session.user = user;
            res.redirect('/dashboard');
        }
    });
});

function requireLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get("/dashboard", requireLogin, (req, res) => {
    if (req.session && req.session.user) {
        console.log(req.session.user);
        res.render('dashboard', req.session.user);
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
