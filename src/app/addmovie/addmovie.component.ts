import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  title="";
  year: Number=0;
  movieId: string =""; 

  constructor(private dbService: DatabaseService, private router: Router){}

  ngOnInit(): void {
  }
  
  onSaveMovie(){
    const obj={title: this.title, year: this.year};
    this.dbService.addMovie(obj).subscribe(data=>{
      this.router.navigate(["/listactors"]);
      
    });
  }

}
