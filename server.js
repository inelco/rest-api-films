var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 5000;

var Movie = require('./models/movie.js');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


mongoose.connect('mongodb://admin:4nUxbTnSnpA_@127.0.0.1:27017/nodejs');
//mongoose.connect('mongodb://192.168.1.100:27017/Test');


var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.send('Welcome to version 1.0.0.0 of movies API');
    });

router.route('/movies')
    .get(function(req, res){
        Movie.find({}, function(err, movies) {
            if (err){
                res.json({'message' : err});
            }
            else{
                res.json({'message' : '', 'movies' : movies});
            }
        });    
    });

router.route('/movie/:id')
    .get(function(req, res){
        var id = req.params.id;
        Movie.findById(id, function(err, movie) {
            if (err){
                res.json({'message' : err});
            }
            else{
                res.json({'message' : '', 'movie' : movie});
            }
        });
    })
    .put(function(req, res){
        var id = req.params.id;
        Movie.findById(id, function(err, movie) {
            if (err){
                res.json({'message' : err});
            }
            else{
                movie.name = req.body.name;
                movie.year = req.body.year;
                movie.rating = req.body.rating;
                
                movie.save(function(err){
                    if (err){
                        res.json({'message' : err});
                    }
                    else{
                        res.json({'message' : 'movie updated'});
                    }
                });
                
            }
        });
    })
    .delete(function(req, res){
        var id = req.params.id;
        Movie.remove({
            _id: id
        }, function(err, bear) {
            if (err){
                res.json({'message' : err});
            }
            else{
                res.json({'message' : 'movie deleted'});
            }
        });
    });

router.route('/movie')
    .post(function(req, res){
        var name = req.body.name;
        var year = req.body.year;
        var rating = req.body.rating;
        
        var movie = new Movie({
            name : name,
            year : year,
            rating : rating
        });
    
        movie.save(function(err){
            if(err){
                res.json({'message ' : err});
            }
            else{
                res.json({'message ' : 'movie added'});
            }
        });
    });

app.use('/',router);
app.listen(port);
