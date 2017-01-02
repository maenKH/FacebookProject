var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/facebookProfile');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    username:String,
    email: String,
    mobile: String
}, {collection: 'users-data'});

var userDataSchema2 = new Schema({
    username:String,
    location:String,
    email: String,
    birthday:String,
    gender: String,
    work_history:String
}, {collection: 'profile-data'});


var UserData2= mongoose.model('UserData2', userDataSchema2);

var UserData1 = mongoose.model('UserData1', userDataSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
    UserData1.find()
        .then(function(doc) {
            res.render('index', {title: 'FB List Users', items: doc});
        });

});



router.get('/view_profile', function(req, res, next) {
    res.render('view_profile', { title: 'FB Profile Viewer'});
});

router.get('/index2', function(req, res, next) {
    res.render('index2', { title: 'FB Profile Viewer'});
});



router.post('/insert', function(req, res, next) {
    var item = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile
    };

    var data = new UserData1(item);
    data.save();

    res.redirect('/');
});

router.post('/update', function(req, res, next) {
    var id = req.body.id2;

    UserData1.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        doc.username = req.body.username2;
        doc.email = req.body.email2;
        doc.mobile = req.body.mobile2;
        doc.save();
    })
    res.redirect('/');
});

router.post('/delete', function(req, res, next) {
    var id2 = req.body.id;
    console.log("idd="+id2);
    UserData1.findByIdAndRemove(id2).exec();
    res.redirect('/');
});
//var superPagination = require('super-pagination').mongoose;

//Schema.plugin(superPagination, defaults);


module.exports = router;
