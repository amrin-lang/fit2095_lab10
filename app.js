//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./router/actorRouter');
const movies = require('./router/movieRouter');
const app = express();
const path= require('path');

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// --WEEK 9: any request other than the CRUD operation should be redirected to this folder
app.use("/", express.static(path.join(__dirname, "dist/lab10")));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

//lab 7
app.delete('/actors/deleteActorMovies/:id',actors.deleteActorMovies);
app.delete('/actors/:actorId/:movieId', actors.deleteMovie); 




//Movie RESTFul  endpoints
app.get('/movies', movies.getAll); 
app.post('/movies', movies.createOne); 
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//lab 7
app.post('/movies/:id/actors',movies.addActor);
app.delete('/movies/:id', movies.deleteOne); 
app.delete('/movies/:movieId/:actorId',movies.deleteActor);
app.get('/movies/:year1/:year2',movies.getAllMovieYr);
app.delete('/movies/twoyears',movies.deleteYear); //re-edit 

//Lab 7 EXTRA task
app.post('/actors/:id/newmovies',actors.addNewMovie);

//-------------------------LAB 9 -----------------------------

app.delete('/movies/delbyyear/',movies.delByYear);
app.put('/movies/addactor/',movies.addAtoM);