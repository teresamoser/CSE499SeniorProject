import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Plant } from '../plant.model';
import { PlantService } from '../plant.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
  })

export class PlantListComponent implements OnInit{
      term: string;
      searchBox: any;
      plants: Plant [] = [];
      plantId: string = '';
      private subscription: Subscription;
      @Input()plant: any;

      constructor(private plantService: PlantService,
                  private route: ActivatedRoute,
                  private router: Router) { }

      ngOnInit(): void {
         //this.plantService.getPlants();
          this.subscription = this.plantService.plantSelectedEvent
          .subscribe(
                (plants: Plant[]) => {
                  this.plants = plants;
                }
            );
        }

      ngOnDestroy(): void {
          this.subscription.unsubscribe();
        }

      onNewPlant() {
          this.router.navigate(['new'], {relativeTo: this.route});
        }

      search(value: string) {
          this.term = value;
        }

}

