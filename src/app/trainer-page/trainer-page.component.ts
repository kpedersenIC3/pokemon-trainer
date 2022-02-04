import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Trainer } from "../models/trainer.model";
import { TrainersService } from "../services/trainers.service";

@Component({
    selector: 'app-trainer-page',
    templateUrl: './trainer-page.component.html',
    styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit{
    constructor(private readonly trainerService: TrainersService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.trainerService.fetchTrainer(1);
        console.log("fetching trainer")

        let currenttrainer: string | null = JSON.parse(localStorage.getItem("currentTrainer") || '{}');
        console.log(currenttrainer,typeof(currenttrainer))
    }
    
    get trainer(): Trainer {
        return this.trainerService.trainer();
    }

    get currenttrainer(): Trainer {
        return JSON.parse(localStorage.getItem("currentTrainer") || '{}');
    }

    public handleLogOut(): void {
        localStorage.clear()
        console.log(localStorage)
        this.router.navigate(['landing'])

    }




}