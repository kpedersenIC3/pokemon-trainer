import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CataloguePageComponent } from "./catalogue-page/catalogue-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { TrainerPageComponent } from "./trainer-page/trainer-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing'
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: 'trainer',
        component: TrainerPageComponent
    },
    {
        path: 'catalogue',
        component: CataloguePageComponent
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule]
})
export class AppRoutingModule {}