const mongoose = require('mongoose');
const Actor = require('../models/actorSchema');
const Movie = require('../models/movieSchema');
module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err,actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        }
    )},
            
        
    
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) { 
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
            
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    deleteActorMovies: function (req,res) {
        Actor.findByIdAndRemove({ _id: req.params.id }, function (err,actor) {
            if (err) return res.status(400).json(err);
            Movie.deleteMany({actors:req.params.id},function(error){
                if (error) return res.status(400).json(error);
                res.json(actor);
            })
        });
    },

    // deleteActorMovies: function (req,res) {
    //     let actorID =req.params.actorId;
    //     Movie.deleteMany({
    //         actorID:{
    //             '$in' : actors
    //         }
    //     }, function (err,obj) {
    //         if (!err) {
    //             Actor.findByIdAndDelete({
    //                 '_id': actorID
    //             });
    //         }
    //     })
    // },
    

    deleteMovie:function(res,req){

        Movie.findOne({_id: req.params.movieId}, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.params.actorId}, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    },

    addNewMovie: function(req,res){
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                })
            })
        });
    }
};