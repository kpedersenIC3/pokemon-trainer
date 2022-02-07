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

  public fetchTrainer(username: string): void {
    this.http
      .get<Trainer[]>(this._trainerURL + `?username=` + username)
      .subscribe((trainer) => {
        //trainer doesn't exist
        if (trainer.length === 0) {
          console.log('trainer non-existing, creating trainer');
          this.addTrainer(username);
        }
        //trainer exists
        else {
          this._trainer = trainer[0];
          localStorage.setItem('currentTrainer', JSON.stringify(this._trainer));
          this.router.navigate(['catalogue']);
        }
      });
  }

  public updateTrainer(trainer: Trainer): void {
    console.log('updating trainer:', trainer);
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
        this.fetchTrainer(data.username);
      });
  }

  public addTrainer(username: string): void {
    console.log('adding trainer');
    this.http
      .post<any>(
        this._trainerURL,
        { username: username, pokemon: [] },
        this._httpOptions
      )
      .subscribe((data) => {
        this.fetchTrainer(data.username);
      });
  }

  public trainer(): Trainer | null {
    return this._trainer;
  }
}
