import { Component, OnInit } from '@angular/core';
import { Plant } from '../plant.model';

import { PlantService } from '../plant.service'; 
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.css'
})

export class PlantDetailComponent implements OnInit {
    plant: Plant;
    id: string;

  constructor(private plantService: PlantService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        //this.plant = this.plantService.getPlant(this.id);
      }
    );
  }

  onEditPlant() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePlant() {
    this.plantService.deletePlant(this.plant);
    this.router.navigate(['/plant.url']);
  }

}

