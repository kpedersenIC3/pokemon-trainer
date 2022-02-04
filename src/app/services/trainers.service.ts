import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer.model";

@Injectable({
    providedIn: 'root'
})
export class TrainersService {
    constructor(private readonly http: HttpClient) {
    }

    private _trainers: Trainer[] = [];
    private _error: string = ''

    public fetchTrainer(id: number): void {
        this.http.get<Trainer[]>(`https://kasper-assignment-api.herokuapp.com/trainers?id=${id}`)
            .subscribe((trainers: Trainer[]) => {
                this._trainers = trainers;
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
        })
    }
    
    public trainer(): Trainer {
        return this._trainers[0];
    }

    public error(): string {
        return this._error;
    }
}