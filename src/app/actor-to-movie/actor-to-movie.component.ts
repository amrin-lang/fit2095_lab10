import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-to-movie',
  templateUrl: './actor-to-movie.component.html',
  styleUrls: ['./actor-to-movie.component.css']
})
export class ActorToMovieComponent implements OnInit {

  moviesDB: any[]=[];

  title="";
  movieId: string =""; 

  actorsDB: any[]=[];
  actorId="";
  fullName: string="";
  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[])=>{
      this.moviesDB = data;
    })
  }

  onGetActors(){
    this.dbService.getActors().subscribe((data: any[])=>{
      console.log(data);
      
      this.actorsDB= data;
    })
  }

  onSelectActor(item){
    this.actorId = item._id;
  }

  onSelectMovie(item){
    this.movieId= item._id;

  }

  onActorInMovie(){
    this.dbService.addActorToMovie(this.actorId, this.movieId).subscribe(result=>{
      this.router.navigate(['/listmovies']);
    })
  }


  

}
