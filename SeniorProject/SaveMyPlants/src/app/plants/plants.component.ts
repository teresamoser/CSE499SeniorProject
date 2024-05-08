import { Component, OnInit } from '@angular/core';

import { Plant } from './plant.model';
import { PlantService } from './plant.service'; 

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit{  
  selectedPlant: Plant;
  Plant: Plant[];
  

constructor(private plantService: PlantService) { }

ngOnInit(): void{
  this.plantService.plantSelectedEvent
  .subscribe(
    (plant: Plant[]) => {
    this.Plant = plant;
  })
}

}
