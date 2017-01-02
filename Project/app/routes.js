// app/routes.js
var express = require('express');
var router = express.Router();
var graph = require('fbgraph');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
graph.setAccessToken('EAACEdEose0cBAB3fTU4MYAx1EgtpAvtpHZCtu0riMzCini87COZCQjFFOlxlJpsi4Pw6ZBCUHAOGCqG4MuU91mOBXTvNc2nsmj5ADU0EioSc0B2VsyKgnTZCsOGtcxngelZAhD0d5DdYx8PRlBnLkLplTvXkZAzp0ciEIsPrqaVQZDZD');

/* GET home page. */
router.get('/', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('users').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            // graph.extendAccessToken({
            //     "access_token":"EAAbXF1jNuDABAE6QrrDi0BbDSZC5B6vq5aXABZAnP2o4uKkx1JF6xSJCrtl523KuSQJUaJct53JHig3i9JBZA7S8F3A3CZCyVubycKa0gRuvWL0ZCI2pD7DDZBEFGV1EcDGU6Ht3wzZABsnBN9QBWAYvWKOwdCKAINZBDaPvzfQORQZDZD"
            //     , "client_id": "1925345134360624"
            //     , "client_secret": "8079180860d9eaa3645f7e501c3385a4"
            // }, function (err, facebookRes) {
            //     console.log(facebookRes);
            // });
            // graph.get("/?ids=4,me", function(err, res) {
            //     console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
            // });

            res.render('index');
        });
    });
});


// router.post('/insert', function(req, res, next) {
//     var item = {
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     };
//
//     mongo.connect(url, function(err, db) {
//         assert.equal(null, err);
//         db.collection('user-data').insertOne(item, function(err, result) {
//             assert.equal(null, err);
//             console.log('Item inserted');
//             db.close();
//         });
//     });
//
//     res.redirect('/');
// });

// router.post('/update', function(req, res, next) {
//     var item = {
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     };
//     var id = req.body.id;
//
//     mongo.connect(url, function(err, db) {
//         assert.equal(null, err);
//         db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
//             assert.equal(null, err);
//             console.log('Item updated');
//             db.close();
//         });
//     });
// });
//
// router.post('/delete', function(req, res, next) {
//     var id = req.body.id;
//
//     mongo.connect(url, function(err, db) {
//         assert.equal(null, err);
//         db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
//             assert.equal(null, err);
//             console.log('Item deleted');
//             db.close();
//         });
//     });
// });
module.exports = router;

// module.exports = function(app, passport) {
//
// 	// =====================================
// 	// HOME PAGE (with login links) ========
// 	// =====================================
// 	app.get('/', function(req, res) {
// 		res.render('index.ejs'); // load the index.ejs file
// 	});
//
// 	// =====================================
// 	// LOGIN ===============================
// 	// =====================================
// 	// show the login form
// 	app.get('/login', function(req, res) {
//
// 		// render the page and pass in any flash data if it exists
// 		res.render('login.ejs', { message: req.flash('loginMessage') });
// 	});
//
// 	// process the login form
// 	app.post('/login', passport.authenticate('local-login', {
// 		successRedirect : '/profile', // redirect to the secure profile section
// 		failureRedirect : '/login', // redirect back to the signup page if there is an error
// 		failureFlash : true // allow flash messages
// 	}));
//
// 	// =====================================
// 	// SIGNUP ==============================
// 	// =====================================
// 	// show the signup form
// 	app.get('/signup', function(req, res) {
//
// 		// render the page and pass in any flash data if it exists
// 		res.render('signup.ejs', { message: req.flash('signupMessage') });
// 	});
//
// 	// process the signup form
// 	app.post('/signup', passport.authenticate('local-signup', {
// 		successRedirect : '/profile', // redirect to the secure profile section
// 		failureRedirect : '/signup', // redirect back to the signup page if there is an error
// 		failureFlash : true // allow flash messages
// 	}));
//
// 	// =====================================
// 	// PROFILE SECTION =========================
// 	// =====================================
// 	// we will want this protected so you have to be logged in to visit
// 	// we will use route middleware to verify this (the isLoggedIn function)
// 	app.get('/profile', isLoggedIn, function(req, res) {
// 		res.render('profile.ejs', {
// 			user : req.user // get the user out of session and pass to template
// 		});
// 	});
//
// 	// =====================================
// 	// FACEBOOK ROUTES =====================
// 	// =====================================
// 	// route for facebook authentication and login
// 	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
//
// 	// handle the callback after facebook has authenticated the user
// 	app.get('/auth/facebook/callback',
// 		passport.authenticate('facebook', {
// 			successRedirect : '/profile',
// 			failureRedirect : '/'
// 		}));
//
// 	// =====================================
// 	// LOGOUT ==============================
// 	// =====================================
// 	app.get('/logout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});
// };
//
// // route middleware to make sure
// function isLoggedIn(req, res, next) {
//
// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();
//
// 	// if they aren't redirect them to the home page
// 	res.redirect('/');
// }
