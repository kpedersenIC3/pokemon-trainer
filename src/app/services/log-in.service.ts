import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trainer } from "../models/trainer.model";


@Injectable({
    providedIn: 'root'
})
export class LogInService {
    constructor(private readonly http: HttpClient){
    }

    public checkIfTrainerExists(username: string): void {
        console.log("checking if user exist")
        this.http.get<Trainer>(`https://kasper-assignment-api.herokuapp.com/trainers?username=${username}`)
            .subscribe(response => {
                console.log(response)
            })
            
    }
}