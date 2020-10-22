var Actor = require('../models/actorSchema');
var Movie = require('../models/movieSchema');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('movies').exec(function (err,movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        }
    )},
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    //lab 7
    deleteOne: function(req, res){
        Movie.findOneAndDelete({ _id: req.params.id }, req.body.id, function(err){
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    addActor:function (req,res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    deleteActor: function (req,res) {

        Movie.findOne({_id: req.params.movieId}, function(err, movie){
            if (err) return res.params.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.params.actorId}, function (err, actor) {
                if (err) return res.status(400).json();
                if (!movie) return res.status(404).json();
                movie.actors.remove(actor._id);
                movie.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },

    getAllMovieYr:function (req,res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        Movie.where('year').gt(year2).lt(year1).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            
        });
    },

    deleteYear: function (req,res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;
        Movie.deleteMany({year:{$gt:year2},year:{$lt:year1}},function(err,movie){
            res.json(movie);
        })
    },

    //*************************** */

    //--------------------LAB 9 functions------------------

    delByYear: (req,res)=>{
        Movie.deleteMany({year:{$lt: req.params.year}},(err, movie)=>{
        res.json(movie);
        })
        console.log(req.params.year);
    },

    addAtoM(){
        Actor.findOne({ _id: req.params.actorId}, function (err, actor) {
           Movie.updateOne({_id: req.params.movieId},function(err,movie){
            movie.actors.push(actor._id);
            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
           })
        })
    },

    deleteActorM(){
        Actor.findOne({ name: req.params.actorId}, function (err, actor) {
           Movie.updateOne({title: req.params.movieId},function(err,movie){
            movie.actors.remove(actor._id);
            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
           })
        })
    }

}

