import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private _trainer: Trainer | null = null;
  private _trainerURL: string = `https://kasper-assignment-api.herokuapp.com/trainers`;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': 'fl9zG/Otu0SSGR4XDJwGbA==',
    }),
  };

  //Fetches userinfo from the API. Checks if the username exists on the API,
  // otherwise adds the new user to the API.
  public fetchTrainer(username: string, fromUrl: string): void {
    this.http
      .get<Trainer[]>(this._trainerURL + `?username=` + username)
      .subscribe((trainer) => {
        //trainer doesn't exist
        if (trainer.length === 0) {
          //username doesn't exist, create one.
          this.addTrainer(username);
        }
        //trainer exists
        else {
          //set localStorage with user.
          this._trainer = trainer[0];
          localStorage.setItem('currentTrainer', JSON.stringify(this._trainer));
          //navigate to catalogue page if logging in on landing page.
          if (fromUrl === '/landing') {
            this.router.navigate(['catalogue']);
          }
        }
      });
  }
  //Update the user API for userid. Update list of pokemon in collection.
  public updateTrainer(trainer: Trainer): void {
    this.http
      .put<any>(
        this._trainerURL + '/' + trainer.id,
        {
          username: trainer.username,
          pokemon: [...trainer.pokemon],
        },
        this._httpOptions
      )
      .subscribe((data) => {
        //fetch the updated trainer to update the localStorage.
        this.fetchTrainer(data.username, '');
      });
  }

  //Adds a new user with username from input and an empty collection.
  public addTrainer(username: string): void {
    console.log('adding trainer');
    this.http
      .post<any>(
        this._trainerURL,
        { username: username, pokemon: [] },
        this._httpOptions
      )
      .subscribe((data) => {
        this.fetchTrainer(data.username, '/landing');
      });
  }

  //sharing the private trainer/user.
  public trainer(): Trainer | null {
    return this._trainer;
  }
}
