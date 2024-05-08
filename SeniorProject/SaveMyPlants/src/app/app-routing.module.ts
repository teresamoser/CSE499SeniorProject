import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PlantsComponent } from "./plants/plants.component"; 
import { GroupsComponent } from "./groups/groups.component"; 
import { PlantEditComponent } from "./plants/plant-edit/plant-edit.component"; 
import { PlantDetailComponent } from "./plants/plant-detail/plant-detail.component"; 
import { ScheduleComponent } from "./schedule/schedule.component";


const appRoutes: Routes = [
    { path: '', redirectTo: '/plants', pathMatch: 'full' },
    { path: 'plants', component: PlantsComponent, children: [
        { path: 'new', component: PlantEditComponent},
        { path: ':id', component: PlantDetailComponent},
        { path: ':id/edit', component: PlantEditComponent},
    ]},
    { path: '', redirectTo: '/groups', pathMatch: 'full' },
    { path: 'groups', component: GroupsComponent },
    
    { path: '', redirectTo: '/schedule', pathMatch: 'full' },
    { path: 'schedule', component: ScheduleComponent},
    ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    })

export class AppRoutingModule {

}