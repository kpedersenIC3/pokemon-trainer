import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LogInService } from "../services/log-in.service";




@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
    constructor(private readonly router: Router,
                private readonly loginService: LogInService){
    }

    ngOnInit(): void {
        console.log("landing page loading");
        //if user in localStorage and api
        
        if(localStorage.getItem("currentTrainer") !== null){
            this.loginService.checkIfTrainerExists(JSON.parse(localStorage.getItem("currentTrainer") || '{}').username)
            console.log("trainer exists in localStorage")
            this.router.navigate(['catalogue']);
        }
    }

    public onTrainerLogIn(createForm: NgForm) :void{
        //for later
        //this.trainerService.checkTrainerAvaibility(createForm.value.username);
        //add to localStorage
        let currentTrainer = {username:createForm.value.username, pokemon:[]}
        localStorage.setItem("currentTrainer", JSON.stringify(currentTrainer))
        console.log("localStorage set", localStorage)
        this.router.navigate(['catalogue']);
    }


}