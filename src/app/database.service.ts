import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }


  //add movie id / actor id
  //aID
  //mID
  
  //---------------ACTOR methods-----------
  getActors(){
    return this.http.get('/actors');
  }

  addActor(actor){
    return this.http.post('/actors',actor,httpOptions);
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }


  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

//--------MOVIE methods----------------

getMovies(){
  return this.http.get('/movies');
}

addMovie(movie) {
  return this.http.post('/movies', movie, httpOptions);
}

deleteMovie(id) {
  let url = "/movies/" + id;
  return this.http.delete(url, httpOptions);
}

addActorToMovie(actorName, movieTitle){
  let url="/movies/addactor"+ actorName +"/"+ movieTitle ;
  return this.http.put(url,httpOptions);
}

/*
//another way 
addActorToMovie(data){
  let url="/movies/addactor"+ data.actorName +"/"+ data.movieTitle ;
  return this.http.put(url,httpOptions);
}
*/

delByYear(year){
  let url="movies/delbyyear/" + year;
  return this.http.delete(url,httpOptions);
}



}