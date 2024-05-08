import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlantsComponent } from './plants/plants.component';
import { HeaderComponent } from './header/header.component';
import { PlantDetailComponent } from './plants/plant-detail/plant-detail.component';
import { PlantItemComponent } from './plants/plant-item/plant-item.component';
import { PlantListComponent } from './plants/plant-list/plant-list.component';
import { PlantEditComponent } from './plants/plant-edit/plant-edit.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlantsComponent,
    HeaderComponent,
    PlantDetailComponent,
    PlantItemComponent,
    PlantListComponent,
    PlantEditComponent,
    ScheduleComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }