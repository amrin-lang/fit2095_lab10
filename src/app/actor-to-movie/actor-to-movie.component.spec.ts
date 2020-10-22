import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorToMovieComponent } from './actor-to-movie.component';

describe('ActorToMovieComponent', () => {
  let component: ActorToMovieComponent;
  let fixture: ComponentFixture<ActorToMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorToMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorToMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
