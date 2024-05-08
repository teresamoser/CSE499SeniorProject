import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Plant } from '../plant.model';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrl: './plant-edit.component.css'
  })

export class PlantEditComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  originalPlant: Plant;
  plant: Plant;
  groupPlants: Plant[] = [];

  constructor(
       private plantService: PlantService,
       private router: Router,
       private route: ActivatedRoute) {
       }
  
  @ViewChild('f', { static: false }) slForm: NgForm;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
          let id = params['id'];
          if (id === undefined || id === null){
            this.editMode = false;
            return;
          }
          //this.originalPlant = this.plantService.getPlant(id);
          if (
            this.originalPlant === undefined || 
            this.originalPlant === null
          ){
            return;
          }
          this.editMode = true;
          this.plant= JSON.parse(JSON.stringify(this.originalPlant)); 
        });
      }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newPlant = new Plant(
        null,
        value.name,
        value.type,
        value.water,
        value.light,
        value.imageUrl,
        value.group
        );
      if (this.editMode) {
        this.plantService.updatePlant(this.originalPlant, newPlant);
        }else{
        this.plantService.addPlant(newPlant);
        }
      this.onCancel();
    }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    }

}


